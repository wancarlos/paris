var express = require('express');
var router = express.Router();
var Promise = require('promise');
var User = require('../models/user');
var moment = require('moment');
var nodemailer = require('nodemailer');
var path = require('path');
var fs = require('fs');
var multer = require('multer');

var transporter = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "fason.contact@gmail.com",
        pass: ("Stylebox19871989-")
    }
});

router.get('/', function(req, res){
  res.render("index")
})

router.post('/send', function(req, res){
  var name = req.body.name;
  var email = req.body.email;

  var newUser = {};
  newUser.from = name;
  newUser.email = email;
  console.log(name, email);
  User.createUser(newUser, function(err, createdUser){
    if(err){
      console.log("there is errors");
      res.send({"errr": true});
    } else {
      console.log("there is no errors");
      var mailOptions = {
          from: '"Fason service client" <fason.contact@gmail.com>', // sender address
          to: email, // list of receivers
          subject : "salut c'est "+name+" je pense que...",
          html : "Nouvelle demande pas encore acceptée <br><br> id : "
      };
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
            res.send({"errr": true});
          } else {
            res.send({"ok": true});
          }
      });
    }
  })
});

module.exports = router;
