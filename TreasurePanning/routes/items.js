var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var upload = multer({dest: 'public/uploads/'});

mongoose.connect('root:root@ds243085.mlab.com:43085/treasurepanning');

var itemSchema = new Schema({
  name: String,
  // seller: String,
  description : String,
  // startPrice
  // addTimeStamp
  // endBidTime
  // status
  // isDeleted
  img:{
    data: Buffer,
    contentType: String
  }
});

var itemModel = mongoose.model('Item',itemSchema);

var monk = require('monk');
var db = monk('root:root@ds243085.mlab.com:43085/treasurepanning');


router.get('/', function(req, res) {
    var collection = db.get('items');
    collection.find({}, function(err, items){
        if (err) throw err;
      	res.json(items);
    });
});

// router.post('/',function(req, res){
 router.post('/',upload.single('myimage'),function(req, res){
        var newItem = new itemModel();
        newItem.name = req.body.name;
        newItem.description = req.body.description;
        // newItem.img.data = fs.readFileSync(req.file.path);
        // newItem.img.contentType = 'image/png';
        newItem.save();
    }
);

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
