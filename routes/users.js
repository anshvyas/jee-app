var express = require('express');
var router = express.Router();

/* GET users listing. */
router.route('/register_1').
	post(function(req, res, next) {
	  // fetch the request data
	  var name=req.body.name;
	  var email=req.body.email;
	  var phoneno=req.body.phoneno;

	  // create the json object to enter into db
	  var user_data={
	  	'name':name,
	  	'email':email,
	  	'phoneno':phoneno
	  };

	  res.send({'status':'registered','user_data':user_data});

	});

router.route('/register_2')
	.post(function(req,res,next){
		
		// fetch the request data
		var d=new Date();
		var standard=req.body.standard;
		var question_frequency=req.body.question_frequency;
		var join_date=d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear();

		// create a json
		var user_data={
			'standard':standard,
			'question_frequency':question_frequency,
			'join_date':join_date,
			'batch':1
		};

		res.send({'status':'registered','user_data':user_data});

	});	

module.exports = router;
