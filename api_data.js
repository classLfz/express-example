define({ "api": [
  {
    "type": "get",
    "url": "/articles",
    "title": "获取文章列表信息",
    "name": "______",
    "group": "Articles",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "articleList",
            "description": "<p>返回文章信息数组</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n   \"tile\": \"文章标题1\",\n   \"date\": 1483941498230,\n   \"author\": \"classlfz\",\n   \"content\": \"文章的详细内容\"\n  },\n  {\n   \"tile\": \"文章标题2\",\n   \"date\": 1483941498230,\n   \"author\": \"classlfz\",\n   \"content\": \"文章的详细内容\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>查询列表出错</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 服务器内部错误\n{\n  \"error\": err\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/middlewares/articles/index.js",
    "groupTitle": "Articles"
  },
  {
    "type": "put",
    "url": "/articles/:id",
    "title": "更新单篇文章信息",
    "name": "________",
    "group": "Articles",
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>作者</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": false,
            "field": "date",
            "description": "<p>创作时间（距1970 年 1 月 1 日的毫秒数）</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>文章内容</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "204",
            "description": "<p>成功更新信息</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>请求上传格式不符合要求</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 请求上传格式不符合要求\n{\n  \"error\": err\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/middlewares/articles/index.js",
    "groupTitle": "Articles"
  },
  {
    "type": "post",
    "url": "/articles",
    "title": "创建新的单个文章信息",
    "name": "__________",
    "group": "Articles",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": false,
            "field": "date",
            "description": "<p>创作日期</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>作者</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>文章内容</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "201",
            "description": "<p>创建成功</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>请求上传格式不符合要求</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>服务器创建过程出错</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 请求上传格式不符合要求\n{\n  \"error\": err\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 服务器创建过程出错\n{\n  \"error\": err\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/middlewares/articles/index.js",
    "groupTitle": "Articles"
  },
  {
    "type": "get",
    "url": "/articles/:id",
    "title": "根据单个id获取文章信息",
    "name": "__id______",
    "group": "Articles",
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "article",
            "description": "<p>返回相应id的文章信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n  {\n    \"tile\": \"文章标题2\",\n    \"date\": 1483941498230,\n    \"author\": \"classlfz\",\n    \"content\": \"文章的详细内容\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>对应id的文章信息不存在</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 对应id的文章信息不存在\n{\n  \"error\": err\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/middlewares/articles/index.js",
    "groupTitle": "Articles"
  },
  {
    "type": "delete",
    "url": "/articles",
    "title": "根据id删除单篇文章信息",
    "name": "__id________",
    "group": "Articles",
    "parameter": {
      "fields": {
        "params": [
          {
            "group": "params",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 2xx": [
          {
            "group": "Success 2xx",
            "optional": false,
            "field": "204",
            "description": "<p>删除成功</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/middlewares/articles/index.js",
    "groupTitle": "Articles"
  }
] });
