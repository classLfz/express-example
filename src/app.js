const express = require('express');
const articleRouter = require('./middlewares/articles');
const mongoose = require('mongoose');
const serverConfig = require('./server.json');
const app = express();

// 连接服务器，根据配置文件server.json来进行配置
mongoose.connect(`mongodb://${serverConfig.dbHost}:${serverConfig.dbPort}/${serverConfig.dbName}`, (err) => {
  if (err) {
    console.error(`连接mongo出错： ${err}`);
    process.exit(1);
  }
});

// middlewares 中间件的使用
app.use(articleRouter);

// 监听3000端口
const server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});