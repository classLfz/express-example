#!/bin/bash -e

# 配置参数
ORIGIN_URL="git@github.com:classLfz/express-example.git"
LOCAL_DIR="express-example"
TASK_NAME="apidoc"
API_DOC="apidoc"

# 克隆远程库
git clone $ORIGIN_URL
cd $LOCAL_DIR

# 切换到独立的gh-pages分支
git checkout --orphan gh-pages

# 安装依赖
npm install gulp gulp-apidoc

# 生成/更新apidocs文件
gulp $TASK_NAME

# 删除除了.gitignore的内容
git rm -rf -q .

# 复制apidocs的内容到根目录
mv $API_DOC/* .

# 删除apidocs文件夹
rm -rf $API_DOC

# 删除node_modules
rm -rf node_modules

# 上传文档到github
git add -A .
git commit -am 'seed gh-pages'
git push -u origin gh-pages --force

# 退出并删除
cd ..
rm -rf $LOCAL_DIR