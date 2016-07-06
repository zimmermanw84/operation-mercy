//  Main Server
//  /server.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

"use strict";

const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const fs = require("fs");

// PORT
const PORT = (process.env.PORT || 4003);

// Global usage of production env
global.isProduction = (process.env.NODE_ENV === "production");

// App root path
global.appRoot = path.resolve(__dirname);

// Template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set public path to root directory to access css
app.use(express.static(path.join(__dirname, 'public')));

//add timestamps in front of log messages
require('console-stamp')(console, { pattern : "dd/mm/yyyy HH:MM:ss.l" });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Router
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(PORT, (req, res, next) => {
  console.log(`Running on port ${PORT}`);
  console.log(`ENVIRONMENT: ${(global.isProduction) ? "PRODUCTION" : "DEVELOPMENT"}`);
});