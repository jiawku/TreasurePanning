var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var path = require('path');
var router=express.Router();

    /* GET home page. */

    router.get('/', function(req, res, next) {
      res.render('index', { user : req.user, title: 'Treasure Panning' });
    });

    router.get('/register', function(req, res) {
        res.render('register', { });
    });

    router.post('/register', function(req, res) {
      Account.register(new Account({ username : req.body.username , firstname: req.body.firstname,lastname:req.body.lastname,phone: Math.round(req.body.phone),address:req.body.address,emailaddress: req.body.emailaddress,isDeleted:'False',isAdmin:'False'}), req.body.password, function(err, account) {
          if (err) {
              res.end("error");
          }

          passport.authenticate('local')(req, res, function () {
            res.redirect('/');
          });
      });
    });

    router.get('/login', function(req, res) {
        res.render('login', { user : req.user });
    });

    router.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/');
    });

    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/ping', function(req, res){
        res.send("pong!", 200);
    });

 module.exports=router;
