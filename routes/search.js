var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
var mongojs=require('mongojs');
var ObjectId = require('mongojs').ObjectID;
var db=mongojs("appdb",['questions']);

router.route('/').post(function(req,res,next){
       var subject=req.body.subject;
       var topic  =req.body.topic;
       var sub_topic=req.body.sub_topic;
       db.questions.find({$and:[{'question_data.subject':subject},{'question_data.topic':topic},{'question_data.sub_topic':sub_topic}]},function(err,save){
          if(err)
            res.send(err);
          else if(!err && save)
          {
            var arr=[];
            save.forEach(function(elements,index,array){
              console.log(elements);
              var question_path=elements.question_data.question[0].path;
              
              var answer_path=elements.question_data.answer[0].path;
              var hint_path=elements.question_data.hint[0].path;
              var temp=question_path.split('/');
              temp.shift();
              question_path='http://localhost:3000/'+temp.join('/');
              console.log(question_path);

              temp=answer_path.split('/');
              temp.shift();
              answer_path='http://localhost:3000/'+temp.join('/');
              console.log('    '+answer_path);

              temp=hint_path.split('/');
              temp.shift();
              hint_path='http://localhost:3000/'+temp.join('/'); 
              console.log('    '+hint_path);


               var to_send_data={'id':elements.question_data.serial_no,'question':question_path,'answer':answer_path,'hint':hint_path};
               arr.push(to_send_data);

            })
            res.send(arr);
          }
        })
     })
     module.exports = router;
