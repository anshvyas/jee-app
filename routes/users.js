var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
var mongojs=require('mongojs');
var ObjectId = require('mongojs').ObjectID;
var db=mongojs("appdb",['users']);
/*var MongoClient=require('mongodb').MongoClient;
var assert=require ('assert');*/
/* GET users listing. */
router.route('/register_1').
	post(function(req, res, next) {
	  // fetch the request data
	  var name=req.body.name;
	  var email=req.body.email;
	  var phoneno=req.body.phoneno;
       var password=req.body.password
	  // create the json object to enter into db
	  var user_data={
	  	'name':name,
	  	'email':email,
	  	'phoneno':phoneno,
	  	'password':password,
	  	'standard':null,
	  	'question_frequency' :null,
	  	'join_date':null,
	  	'batch':null
	  	
	  };

	db.users.insert(user_data,function(err,save){
		if(err){
			console.log(err);
		}
		else {
			console.log(save);
			res.send({'status':'registered','user_data':save});
		}
	});
	  
	});
	

       
router.route('/register_2')
	.post(function(req,res,next){
		
		// fetch the request data
		var d=new Date();
		var standard=req.body.standard;
		var question_frequency=req.body.question_frequency;
		var month=d.getMonth()+1;
		var join_date=d.getDate()+'/'+month+'/'+d.getFullYear();
        var id=req.body.id;
		// create a json
		var user_data_2={

			'standard':standard,
			'question_frequency':question_frequency,
			'join_date':join_date,
			'batch':1
		};
          db.users.update({'_id':ObjectId(id)},{$set:user_data_2},function(err,save){
          	if(err){
			console.log(err);
		}
		else {
			console.log(save);
			res.send({'status':'registered','user_data':save});
		}
	}); 
		//res.send({'status':'registered','user_data':user_data_2});
        
	});	
router.route('/login').post(function(req,res,next){
		var email=req.body.email;
		var password=req.body.password;
		db.users.findOne({'email':email},function(err,save){
			if(save&& !err){
				console.log(save.password);
				//var user=JSON.parse(save);
				//console.log(user.password);
                   if(save.password==password)
                   {

                   	res.send({'status':1,'message':save});
                   }
                   else
                   	res.send({'status':0,'message':'sorry wrong password'});
			}
			else{
                 res.send({'status':0,'message':'sorry you are not a registered user'});
			}

		})
	})	

module.exports = router;
