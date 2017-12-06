var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('root:root@ds243085.mlab.com:43085/treasurepanning');

router.post('/', function(req, res){
    var collection = db.get('queries');
    collection.insert({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    }, function(err, query){
        if (err) throw err;
        res.json(query);
    });
});

router.get('/', function(req, res) {
    var collection = db.get('queries');
    collection.find({},function(err, queries){
        if (err) throw err;
        if (queries.length==0){
          res.status(404).end("empty messages");
        }
        else{
          res.json(queries);
        }

    });
});

module.exports = router;
