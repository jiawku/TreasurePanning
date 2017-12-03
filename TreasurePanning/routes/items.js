var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var storage = multer.diskStorage({
  destination: './public/images/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage });

mongoose.connect('root:root@ds243085.mlab.com:43085/treasurepanning');

var itemSchema = new Schema({
  name: String,
  description : String,
  category : String,
  startPrice: Number,
  endBidTime: String,
  img:{contentType:String,
    data:Buffer},
  addTimeStamp: String,
  seller: String,
  status: String,
  isDeleted: String
});

var itemModel = mongoose.model('Item',itemSchema);

var monk = require('monk');
var db = monk('root:root@ds243085.mlab.com:43085/treasurepanning');


router.get('/', function(req, res) {
    var collection = db.get('items');
    collection.find({isDeleted:'false',status:'open'}, function(err, items){
        if (err) throw err;
      	res.json(items);
    });
});

 router.post('/',upload.single('image'),function(req, res){
        var newItem = new itemModel();
        var bidenddate = new Date(req.body.endBidTime);
        newItem.name = req.body.name;
        newItem.description = req.body.description;
        newItem.category=req.body.category;
        newItem.startPrice=req.body.startPrice;
        newItem.endBidTime=bidenddate.toLocaleString();
        newItem.img.contentType=req.file.mimetype;
        newItem.img.data=fs.readFileSync(req.file.path);
        newItem.addTimeStamp=new Date().toLocaleString();
        newItem.seller=req.user.username;
        newItem.status='open';
        newItem.isDeleted='false';
        newItem.save();
        res.end("success");
    }
);



router.get('/image/:id', function(req, res) {
    itemModel.findById(req.params.id, function (error, result) {
      res.contentType(result.img.contentType);
      res.end(result.img.data);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('items');
    collection.findOne({ _id: req.params.id},function(err, item){
        if (err) throw err;
      	res.json(item);
    });
});


router.put('/:id', function(req, res){
  itemModel.findById(req.params.id, function (err, item) {
    if (err) return handleError(err);
      item.isDeleted = 'true';
      item.save(function (err, deletedItem) {
        if (err) return handleError(err);
       res.send(deletedItem);
    });
  });
});


router.post('/:id',upload.single('image'),function(req, res){
  itemModel.findById(req.params.id, function (err, item) {
    if (err) return handleError(err);
       var bidenddate = new Date(req.body.endBidTime);
       //console.log(req.params.id);
       item.name = req.body.name;
       item.description = req.body.description;
       item.category=req.body.category;
       item.startPrice=req.body.startPrice;
       item.endBidTime=bidenddate.toLocaleString();
       item.img.contentType=req.file.mimetype;
       item.img.data=fs.readFileSync(req.file.path);
       item.addTimeStamp=new Date().toLocaleString();
       item.seller=req.user.username;
       item.status='open';
       item.isDeleted='false';
       item.save(function (err, updatedItem) {
        if (err) return handleError(err);
        res.send(updatedItem);
        });
      });
   });

module.exports=router;
