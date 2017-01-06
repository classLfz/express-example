const express = require('express');
const bodyParser = require('body-parser');
const listRouter = express.Router();

listRouter.use(bodyParser.json());

listRouter.get('/list', (req, res) => {
  res.send('Get /list');
});

module.exports = listRouter;