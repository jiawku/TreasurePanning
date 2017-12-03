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
      Account.register(new Account({ username : req.body.username , firstname: req.body.firstname,lastname:req.body.lastname,phone: Math.round(req.body.phone),address:req.body.address,emailaddress: req.body.email,isDeleted:'False',isAdmin:'False'}), req.body.password, function(err, account) {
          if (err) {
              return res.status(500).json({err:err});
          }

          passport.authenticate('local')(req, res, function () {
              return res.status(200).json({
                status:"Registration successful!"
              })
          });
      });
    });

    router.get('/status', function(req, res) {
      if (!req.isAuthenticated()) {
        return res.status(200).json({
          status: false
        });
      }
      res.status(200).json(
        req.user
      );
    });

    // router.get('/login', function(req, res) {
    //     res.render('login', { user : req.user });
    // });

    // router.post('/login', passport.authenticate('local'), function(req, res) {
    //
    //     // res.end('loginSuccess');
    //     res.redirect('/');
    // });

    router.post('/login', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({
            err: info
          });
        }
        req.logIn(user, function(err) {
          if (err) {
            return res.status(500).json({
              err: 'Could not log in user'
            });
          }
          res.status(200).json({
            status: 'Login successful!'
          });
        });
      })(req, res, next);
    });


    // router.get('/logout', function(req, res) {
    //     req.logout();
    //     res.redirect('/');
    // });

    router.get('/logout', function(req, res) {
      req.logout();
      res.status(200).json({
        status: 'Bye!'
      });
    });

    router.get('/ping', function(req, res){
        res.send("pong!", 200);
    });

 module.exports=router;
