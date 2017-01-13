/**
 * 中间件例子，这里假设我们需要一个文章资源（`/articles`）
 */
const express = require('express');
const bodyParser = require('body-parser');
const Articles = require('./model');
const helper = require('../../helper');
const articleRouter = express.Router();

articleRouter.use(bodyParser.json());

/**
 * @api {get} /articles 获取文章列表信息
 * @apiName 获取文章列表
 * @apiGroup Articles
 *
 * @apiSuccess {Array} articleList 返回试卷信息数组
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *        "tile": "文章标题1",
 *        "date": 1483941498230,
 *        "author": "classlfz",
 *        "content": "文章的详细内容"
 *       },
 *       {
 *        "tile": "文章标题2",
 *        "date": 1483941498230,
 *        "author": "classlfz",
 *        "content": "文章的详细内容"
 *       }
 *     ]
 *
 * @apiError (Error 5xx) 500 查询列表出错
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 服务器内部错误
 *     {
 *       "error": err
 *     }
 */
articleRouter.get('/articles', (req, res) => {
  Articles.find({}).sort({name: 'asc'}).exec()
    .then(articleList => {
      res.json(articleList);
    }, err => {
      res.status(500).json(err);
    });
});

/**
 * @api {get} /articles/:id 根据单个id获取文章信息
 * @apiName 根据id获取文章信息
 * @apiGroup Articles
 *
 * @apiParam (params) {String} id       试卷id
 *
 * @apiSuccess {Array} article 返回相应id的文章信息
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *      {
 *        "tile": "文章标题2",
 *        "date": 1483941498230,
 *        "author": "classlfz",
 *        "content": "文章的详细内容"
 *       }
 *
 * @apiError (Error 4xx) 404 对应id的文章信息不存在
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 对应id的文章信息不存在
 *     {
 *       "error": err
 *     }
 */
articleRouter.get('/articles/:id', (req, res) => {
  // 获取id
  let id = req.params.id;
  // 根据id进行查询并处理结果
  Articles.findById(id).exec()
    .then(article => {
      res.json(article);
    }, err => {
      console.error(err);
      res.sendStatus(404);
    });
});

/**
 * @api {post} /articles 创建新的单个文章信息
 * @apiName 创建新的单个文章信息
 * @apiGroup ExaminationPaper
 *
 * @apiParam (body) {String} title       试卷标题（如：2017年国家教师资格证考试）
 * @apiParam (body) {Number} duration    考试时长，单位为分钟
 * @apiParam (body) {Number} start_time  考试开始时间（距1970 年 1 月 1 日的毫秒数）
 * @apiParam (body) {Number} end_time    考试结束时间（距1970 年 1 月 1 日的毫秒数）
 * @apiParam (body) {String} type        试卷类型（固定试卷/随机试卷）
 * @apiParam (body) {Number} last_modified_time       最后一次修改时间（距1970 年 1 月 1 日的毫秒数）
 *
 * @apiSuccess (Success 2xx) 201 创建成功
 *
 * @apiError (Error 4xx) 400 请求上传格式不符合要求
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 请求上传格式不符合要求
 *     {
 *       "error": err
 *     }
 *
 * @apiError (Error 5xx) 500 服务器创建过程出错
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 服务器创建过程出错
 *     {
 *       "error": err
 *     }
 */
articleRouter.post('/articles', (req, res) => {
  // 定义检验需要的schema
  let schema = {
    properties: {
      title: {
        type: 'string'
      },
      date: {
        type: 'number'
      },
      author: {
        type: 'string'
      },
      content: {
        type: 'string'
      }
    },
    required: ['title', 'date', 'author', 'content']
  };
  // 获取意欲新增文章内容，并进行检验
  let newArticle = req.body;
  let [validated, errors] = helper.ajvCompileAndValid(schema, newArticle);
  if (!validated) {
    res.status(400).json(errors);
    return;
  }

  // 新增文章数据结构没问题，则进行数据库添加
  Articles.create(newArticle)
    .then(() => {
      res.send(201);
    }, err => {
      res.status(500).json(err);
    });
});

/**
 * 根据ID删除单篇文章
 *
 * 删除成功，返回状态码204;
 * 删除失败，返回状态码400;
 */
articleRouter.delete('/articles/:id', (req, res) => {
  // 获取id
  let id = req.params.id;
  // 根据id进行数据的操作
  Articles.findByIdAndRemove(id).exec()
    .then(() => {
      res.sendStatus(204);
    }, err => {
      res.status(400).json(err);
    });
});

module.exports = articleRouter;