#!/usr/bin/env node
var express = require("express");
var app = express();

const { initiateUpload } = require("../controllers");

app.get("/initiate-upload", initiateUpload);

module.exports = app;
