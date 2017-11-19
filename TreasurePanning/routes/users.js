var express = require('express');
var router = express.Router();

/* GET users listing. */
var monk = require('monk');
var db = monk('root:root@ds243085.mlab.com:43085/treasurepanning');

router.get('/:username', function(req, res) {
    var collection = db.get('accounts');
    collection.find({username:req.params.username}, function(err, items){
        if (err) throw err;
      	res.json(items);
    });
});

module.exports = router;
