var express = require('express');
var router = express.Router();
var Promise = require('promise');
var User = require('../models/user');
var moment = require('moment');
var nodemailer = require('nodemailer');
var path = require('path');
var fs = require('fs');
var multer = require('multer');


router.get('/', function(req, res){
  console.log("hello world")
  res.render("index")
})

module.exports = router;
