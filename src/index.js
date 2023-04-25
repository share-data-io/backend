#!/usr/bin/env node

require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var indexRouter = require("./routes/index");
// var cors = require("cors");
var http = require("http");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(validator());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {

  console.log({headers: req.headers})

  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.SHARE_DATA_APP);
  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET");
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

app.use("/api", indexRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

var port = "4000";
app.set("port", port);
console.log("API is running on the port", port);

var server = http.createServer(app);

server.listen(port, () => {
  console.log("starting ");
});

module.exports = app;
