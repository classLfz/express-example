#!/bin/bash -e

# git clone
git clone git@github.com:classLfz/express-example.git
cd express-example

# 切换到独立的gh-pages分支
git checkout --orphan gh-pages

# 安装依赖
npm install gulp gulp-apidoc

# 生成/更新apidocs文件
gulp apidoc

# 删除所有内容
git rm -rf -q .

# 复制apidocs的内容到根目录
mv apidoc/* .

# 删除apidocs文件夹
rm -rf apidoc

# 删除node_modules
rm -rf node_modules

# 上传文档到github
git add -A .
git commit -am 'seed gh-pages'
git push -u origin gh-pages --force

# 退出并删除
cd ..
rm -rf express-example