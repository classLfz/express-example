/*global  suite setup teardown test*/
const express = require('express');
const supertest = require('supertest');
const sinon = require('sinon');
const mongoose = require('mongoose');

require('sinon-as-promised');
require('sinon-mongoose');

const articleRouter = require('./index');

suite('Article Router', () => {
  let app;
  let ArticleMock;
  let mockData;

  setup(() => {
    app = express();
    app.use(articleRouter);

    let Articles = mongoose.model('Articles');
    ArticleMock = sinon.mock(Articles);

    // 假数据
    mockData = {
      title: '测试标题',
      author: 'classlfz',
      date: 148394198230,
      content: '测试文章'
    };
  });

  teardown(() => {
    ArticleMock.restore();
  });

  test('GET /articles', done => {
    // 假数据
    let mockDataArr = [mockData, mockData];
    ArticleMock
      .expects('find')
      .chain('exec')
      .resolves(mockDataArr);

    supertest(app)
      .get('/articles')
      .expect(200, mockDataArr, done);
  });

  test('GET /articles/:id', (done) => {
    ArticleMock
      .expects('findById').withArgs('1')
      .chain('exec')
      .resolves(mockData);

    supertest(app)
      .get('/articles/1')
      .expect(200, mockData, done);
  });

  test('GET /articles/:id with wrong id', (done) => {
    ArticleMock
      .expects('findById').withArgs('wrongid')
      .chain('exec')
      .rejects('error');

    supertest(app)
      .get('/articles/wrongid')
      .expect(404, done);
  });

  test('POST /articles', (done) => {
    ArticleMock
      .expects('create')
      .resolves('done');

    supertest(app)
      .post('/articles')
      .send(mockData)
      .expect(201, done);
  });

  test('POST /articles without title', (done) => {
    delete mockData.title;
    supertest(app)
      .post('/articles')
      .send(mockData)
      .expect(400, done);
  });

  test('PUT /articles/:id', (done) => {
    ArticleMock
      .expects('findByIdAndUpdate').withArgs('1')
      .chain('exec')
      .resolves('done');

    supertest(app)
      .put('/articles/1')
      .send(mockData)
      .expect(204, done);
  });

  test('PUT /articles/:id with wrong id', (done) => {
    ArticleMock
      .expects('findByIdAndUpdate').withArgs('wrongid')
      .chain('exec')
      .rejects('error');

    supertest(app)
      .put('/articles/wrongid')
      .send(mockData)
      .expect(400, done);
  });

  test('DELETE /articles/:id', (done) => {
    ArticleMock
      .expects('findById').withArgs('1')
      .chain('exec')
      .resolves('done');

    ArticleMock
      .expects('remove').withArgs()
      .chain('exec')
      .resolves();

    supertest(app)
      .del('/articles/1')
      .expect(204, done);
  });

  test('DELETE /articles/:id with wrong id', (done) => {
    ArticleMock
      .expects('findById').withArgs('wrongid')
      .chain('exec')
      .rejects('error');

    supertest(app)
      .del('/articles/wrongid')
      .expect(204, done);
  });
});
