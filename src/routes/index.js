#!/usr/bin/env node
var express = require("express");
var app = express();

const { checkRequest } = require("../middlewares");
const { initiateUpload, cancelUpload } = require("../controllers");

app.get("/initiate-upload", checkRequest, initiateUpload);
app.post("/cancel-upload", checkRequest, cancelUpload);

module.exports = app;
