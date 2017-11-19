var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var upload = multer({dest: 'public/uploads/'})

mongoose.connect('root:root@ds243085.mlab.com:43085/treasurepanning');

var itemImage = new Schema({
    data: Buffer,
    contentType: String
});

var itemImage = mongoose.model('Images',itemImage);

router.get('/', function(req, res) {
    res.send("pong!", 200);
});

router.post('/',upload.single('myimage'),function(req, res){
        var newImage = new itemImage();
        newImage.data = fs.readFileSync(req.file.path);
        newImage.contentType = req.file.path.mimetype;
        newImage.save();
        res.send(req.file);
    });

module.exports = router;
