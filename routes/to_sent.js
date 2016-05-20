var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
var mongojs=require('mongojs');
var ObjectId = require('mongojs').ObjectID;
var db=mongojs("appdb",['users','questions','to_sent']);
router.route('/').post(function(req,res,next){
       var subject=req.body.subject;
       var topic=req.body.topic;
       var sub_topic=req.body.sub_topic;
       var id=req.body.id;
       db.to_sent.find({'user_id':id},function(err,save){
       // console.log(save);
       	  if(true)
       	  {
            //save.length==0 to be uncommented later
             db.questions.find({$and:[{'question_data.subject':subject},
            	{'question_data.topic':topic},
            	{'question_data.sub_topic':sub_topic}]},
            	function(err,save){
                if(err)
                res.send(err);
                else if(!err && save)
                {
                 var arr=[];
                 var array=[];// to store random numbers
                 var insert_array=[];
                 var rand1=Math.floor(Math.random()*(save.length-1));
                 var counter=2;
                 array.push (rand1);
                 while(counter-1!=0)
                 {
            	   var rand2=Math.floor(Math.random()*(save.length-1));
            	    if(rand1!=rand2)
            	    {
            		counter--;
            		array.push (rand2);
            	    }

                  }
                // console.log(array);
                // console.log(save);
            
             
                  for(var i=0;i<=array.length-1;i++)
                      {	
		                   var question_path=save[array[i]].question_data.question[0].path;
		                   var answer_path=save[array[i]].question_data.answer[0].path;
		                   var hint_path=save[array[i]].question_data.hint[0].path;
		                   var temp=question_path.split('/');
		                   temp.shift();
		                   question_path='http://localhost:3000/'+temp.join('/');
		                   //console.log(question_path);
		                   temp=answer_path.split('/');
		                   temp.shift();
		                   answer_path='http://localhost:3000/'+temp.join('/');
		                   // console.log('    '+answer_path);
		                   temp=hint_path.split('/');
		                   temp.shift();
		                   hint_path='http://localhost:3000/'+temp.join('/'); 
		                   // console.log('    '+hint_path);
		                   var to_send_data={'question':question_path,'answer':answer_path,'hint':hint_path};
		                   arr.push(to_send_data);
				               var insert_data ={
				         	     user_id:id,
				         	     question_id:(save[array[i]]._id).toString(),
				               }
				             insert_array.push(insert_data);

                    }
                     //console.log(insert_array);
                    db.to_sent.insert(insert_array,function(err,save){
                    if (save)
                   res.send(arr);  
                   })
                }   
            })
       	  }
            /*
            else if(save.length!=0){
                var sent_q_id=[];
                for(i=0;i<=save.length-1;i++)
                {
                  sent_q_id.push(ObjectId(save[i].question_id));
                }
                console.log(sent_q_id);
                db.questions.find({$and:[{'question_data.subject':subject},
              {'question_data.topic':topic},
              {'question_data.sub_topic':sub_topic},{'_id':{$nin:sent_q_id}}]},function(err,save){
               
               console.log('here');
               console.log(save);

                if(save.length!=0)
                {

                  console.log('here');
                  console.log(save.length);
                  var arr=[];
                 var array=[];// to store random numbers
                 var insert_array=[];
                 var rand1=Math.floor(Math.random()*(save.length-1));
                 var counter=2;
                 array.push (rand1);
                 console.log(array);
                 while(counter-1!=0)
                 {
                     var rand2=Math.floor(Math.random()*(save.length-1));
                      if(rand1!=rand2)
                      {
                    counter--;
                    array.push (rand2);
                      }
                  }
                  console.log(array);
                  console.log('now here');
                 
                    for(var i=0;i<=array.length-1;i++)
                      { 
                       var question_path=save[array[i]].question_data.question[0].path;
                       var answer_path=save[array[i]].question_data.answer[0].path;
                       var hint_path=save[array[i]].question_data.hint[0].path;
                       var temp=question_path.split('/');
                       temp.shift();
                       question_path='http://localhost:3000/'+temp.join('/');
                       //console.log(question_path);
                       temp=answer_path.split('/');
                       temp.shift();
                       answer_path='http://localhost:3000/'+temp.join('/');
                       // console.log('    '+answer_path);
                       temp=hint_path.split('/');
                       temp.shift();
                       hint_path='http://localhost:3000/'+temp.join('/'); 
                       // console.log('    '+hint_path);
                       var to_send_data={'question':question_path,'answer':answer_path,'hint':hint_path};
                       arr.push(to_send_data);
                       var insert_data ={
                       user_id:id,
                       question_id:(save[array[i]]._id).toString(),
                       }
                     insert_array.push(insert_data);

                    }
                    console.log(insert_array);//console.log(save);
                    db.to_sent.insert(insert_array,function(err,save){
                      if(err)
                        res.send(err);
                      if(save)
                        res.send(arr);
                    })
                }
                if(err)
                  console.log(err);
              })

            }*/
      })
   })
 module.exports = router;