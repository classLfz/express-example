# express-example[![Build Status](https://travis-ci.org/classLfz/express-example.svg?branch=master)](https://travis-ci.org/classLfz/express-example)

一个简单的express服务，使用mongodb作为数据库。使用原生js编写。

[点击查看文档](https://classlfz.github.io/express-example/)

修改配置文件`src/server.json`进行对数据库地址、端口、数据库名称的修改。默认为：
```json
{
  "dbHost": "127.0.0.1",
  "dbPort": 27017,
  "dbName": "exampledb"
}
```

`express-example`暂时只实现一个`/articles`资源为例子。

## 需要用到的框架或库

- [express](http://www.expressjs.com.cn/): 基于 Node.js 平台，快速、开放、极简的 web 开发框架;

- [mongoose](http://mongoosejs.com/): elegant mongodb object modeling for node.js;

- [ajv](https://github.com/epoberezkin/ajv): The fastest JSON Schema validator for node.js and browser. Supports v5 proposals.

## 名词解释

- Schema：一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力

- Model：由Schema发布生成的模型，具有抽象属性和行为的数据库操作对象

## 开发

首先确保你已经安装好了`node.js`的环境。

### 安装依赖

`npm install`

### 语法检查

`gulp lint`或者`npm run lint`

### 生成文档

文档的编写使用[apidoc](http://apidocjs.com/)

`gulp apidoc`或者`npm run apidoc`

### 构建api文档，并上传到github pages

`./gh.sh`

`gh.sh`文件可根据需求修改里边的参数。必须是使用当前用户运行，因为需要key来执行里边的命令。如果不可运行，则需要通过`chmod +x ./gh.sh`来修改文件属性。

### 开启服务

`npm run serve`或者`node src/app.js`
