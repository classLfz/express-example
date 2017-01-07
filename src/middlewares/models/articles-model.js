/**
 * 中间件model，构建数据库数据结构
 */
const mongoose = require('mongoose');

let articleSchema = new mongoose.Schema({
  title: {type: String, require: true},
  data: {type: Number, require: true},
  author: {type: String, require: true},
  content: {type: String, require: true}
});

let Articles = mongoose.model('List', articleSchema);

module.exports = Articles;