/**
 * 中间件例子，这里假设我们需要一个文章资源（`/articles`）
 */
const express = require('express');
const bodyParser = require('body-parser');
const Articles = require('./models/articles-model');
const helper = require('./helper');
const articleRouter = express.Router();

articleRouter.use(bodyParser.json());

/**
 * 获取文章列表
 *
 * 查询成功，返回状态码200（默认）以及列表数组;
 * 查询出错，返回状态码500以及报错
 */
articleRouter.get('/articles', (req, res) => {
  Articles.find({}).sort({name: 'asc'}).exec()
    .then(articleList => {
      res.json(articleList);
    }, err => {
      res.status(500).json(err);
    })
});

/**
 * 根据ID来查询单篇文章
 *
 * 查询成功，返回文章内容;
 * 查询失败，返回状态码404;
 */
articleRouter.get('/articles/:id', (req, res) => {
  // 获取id
  let id = req.params.id;
  // 根据id进行查询并处理结果
  Articles.findById(id).exec()
    .then(article => {
      res.json(article);
    }, err => {
      res.sendStatus(404);
    });
});

/**
 * 创建单篇文章
 *
 * 创建成功，返回状态码201;
 * 创建失败，返回状态码500以及相应的报错;
 */
articleRouter.post('/articles', (req, res) => {
  // 定义检验需要的schema
  let schema = {
    properties: {
      title: {
        type: 'string'
      },
      data: {
        type: 'number'
      },
      author: {
        type: 'string'
      },
      content: {
        type: 'string'
      }
    },
    required: ['title', 'data', 'author', 'content']
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