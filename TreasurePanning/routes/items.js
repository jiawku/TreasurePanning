var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('root:root@ds243085.mlab.com:43085/treasurepanning');

router.get('/', function(req, res) {
    var collection = db.get('items');
    collection.find({username:req.user.username}, function(err, items){
        if (err) throw err;
      	res.json(items);
    });
});

router.post('/', function(req, res){
    var collection = db.get('items');
    collection.insert({
        title: req.body.title,
        username: req.user.username,
        // picture: req.body.picture,
        description: req.body.description
    }, function(err, item){
        if (err) throw err;

        res.json(item);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('items');
    collection.findOne({ _id: req.params.id ,username:req.user.username},function(err, item){
        if (err) throw err;

      	res.json(item);
    });
});

router.put('/:id', function(req, res){
    var collection = db.get('items');
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        description: req.body.description,
        username: req.user.username
    }, function(err, item){
        if (err) throw err;

        res.json(item);
    });
});

router.delete('/:id', function(req, res){
    var collection = db.get('items');
    collection.remove({ _id: req.params.id ,username:req.user.username}, function(err, item){
        if (err) throw err;

        res.json(item);
    });
});

module.exports = router;
