const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const requestIp = require('request-ip');
const mongoose = require('mongoose');
const keys = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(requestIp.mw());

app.use('/api/v1/', require('./routes/apiRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);
