var express = require('express');
var app = express();
var mongoose = require('mongoose');
const router = express.Router();
var cors = require('cors');
var bodyParser = require('body-parser')
app.use(cors());
app.use(express.json());
var port = 5000;

var db = require("./config/database");
db.establishConnection();

var issueRouter = require('./Routes/Issue');
app.use('/',issueRouter);





app.listen(port, () => console.log("server started on port" + port));

module.exports = app;