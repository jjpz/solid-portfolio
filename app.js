const express = require('express');
const app = express();
const router = require('./router');
const path = require('path');
const env = require('dotenv');
const envFilePath = path.resolve(__dirname, './.env');
env.config({ path: envFilePath });

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static('public'));

app.set('views', 'views');

// app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.use('/', router);

module.exports = app;
