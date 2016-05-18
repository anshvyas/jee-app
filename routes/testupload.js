var express = require('express');
var router = express.Router();
var multer=require('multer');
var upload = multer({ dest: './uploads/' });
router.route('/').post(upload.single('question'),function(req,res,next){
	console.log(req);
	res.send({'success':1});


});
 module.exports = router;