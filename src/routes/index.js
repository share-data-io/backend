#!/usr/bin/env node
var express = require("express");
var app = express();

const { checkRequest } = require("../middlewares");
const { initiateUpload } = require("../controllers");

app.get("/initiate-upload", checkRequest, initiateUpload);

module.exports = app;
