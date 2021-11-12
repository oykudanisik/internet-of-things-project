const express = require('express');
const cors = require('cors');
const path = require('path');
const expressLayoutes = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const config = require('./startup/config');
const winston = require('winston');
const err = require('./middleware/errors');
const userRoutes = require('./routes/userRoutes');
const useractionRoutes = require('./routes/useractionRoutes');
const homeRoutes = require('./routes/homeRoutes');

const session = require('express-session');
const cookieParser = require("cookie-parser");

const app = express();

//require('./startup/db')();
require('./startup/logging')();
require('./startup/validations')();
require('./startup/db')();
// require('./startup/wsSocket');
require('./startup/mqtt');

//app.use(expressLayoutes);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: 'iotcourse',
  cookie: { maxAge: oneDay },
  resave: false,
  saveUninitialized: true
}));

app.use(userRoutes.routes);
app.use(homeRoutes.routes);
app.use(useractionRoutes.routes);
app.use(err);

app.listen(config.port, () => winston.info('App is listening on url http://localhost:' + config.port));