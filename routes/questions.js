var express = require('express');
var fs=require('fs');
var mkdirp=require('mkdirp');
var router = express.Router();
var mongojs=require('mongojs');
const Imagemin = require('imagemin');
var db=mongojs("appdb",['questions']);

  var multer=require('multer');


   // for uploading question
  var storage =   multer.diskStorage({
  destination: function (req, file, callback) {

    var upload_path='./uploads'+'/'+JSON.parse(req.body.subject)+'/'+JSON.parse(req.body.topic)+'/'+JSON.parse(req.body.sub_topic)+'/';

    if(!fs.existsSync(upload_path))
      mkdirp.sync(upload_path);

    callback(null, upload_path);
  },
  filename: function (req, file, callback) {
    var temp=file.originalname.split(".");
    callback(null, file.fieldname+'-'+JSON.parse(req.body.subject) + '-' +JSON.parse(req.body.topic)+'-'+JSON.parse(req.body.sub_topic)+'_'+JSON.parse(req.body.serial_no)+'.'+temp[temp.length-1]);
  }
  });

  var upload_question= multer({ storage : storage}).fields([{'name':'question'},{'name':'answer'},{'name':'hint'}]);



  router.route('/add').post(function(req,res,next){

     upload_question(req,res,function(err) {
        if(err) {
            return res.send(err);
        }
         else
            {
              new Imagemin()
              .src([req.files.question[0].path,req.files.answer[0].path,req.files.hint[0].path])
              .dest(req.files.question[0].destination)
              .use(Imagemin.optipng({optimizationLevel: 5}))
              .run((err, files) => {
               console.log(files);
            });

             var question_data={
            'serial_no':JSON.parse(req.body.serial_no),
            'subject':JSON.parse(req.body.subject),
            'topic'  :JSON.parse(req.body.topic),
            'sub_topic':JSON.parse(req.body.sub_topic),
            'question' :req.files.question,
            'answer'   :req.files.answer,
            'hint':req.files.hint

            } 
          db.questions.insert({question_data},function(err,save){
            if(err)
            {
              res.send(err);
            }
            else(!err&&save)
              res.send(save);
          });  
        }
      });
   });
   



  

module.exports=router;