var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());
var mongojs=require('mongojs');
var db=mongojs("appdb",['index']);
router.use(bodyParser.urlencoded({ extended: false }));
router.route('/').get(function(req,res,next){
	db.index.find(function(err,data){
		if(err)
		res.send(err);
		else
		if(!err && data)
		res.send(data);

	})

});
 module.exports = router;