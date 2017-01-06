const express = require('express');
const listRouter = require('./middlewares/list');
const app = express();

// middlewares 中间件的使用
app.use(listRouter);

// 监听3000端口
const server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});