var express = require('express');
var fs=require('fs');
 var PDFParser = require("pdf2json/PDFParser");
 var pdfParser=new PDFParser();
var router = express.Router();
var mongojs=require('mongojs');
var db=mongojs("appdb",['questions']);
router.route('/add').post(function(req,res,next){
  var serial_no=req.body.serial_no;
  var subject=req.body.subject;
  var topic=req.body.topic;
  var sub_topic=req.body.sub_topic;
  var question=req.body.question;
  var answer=req.body.answer;
  var concept_behind=req.body.concept_behind;

  var question_data={
  	'serial_no':serial_no,
  	'subject':subject,
  	'topic'  :topic,
  	'sub_topic':sub_topic,
  	'question' :question,
  	'answer'   :answer,
  	'concept_behind':concept_behind
      
   }
   db.questions.findOne({'serial_no':serial_no},function(err,save){
   	  if(!save){
          db.questions.insert(question_data,function(err,save){
          	if(err){
			console.log(err);
		     }
		 else {
			console.log(save);
			res.send({'status':'entered','question_data':save});
		     }  
          })
   	    }
   	  else{

            res.send('question already exists');
   	     }
   	    
   })
})
/*router.route('/dummy').post(function(req,res,next){
 pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {
       fs.writeFile("./sample.json", JSON.stringify(pdfData));
       res.send(pdfData);
    });

    pdfParser.loadPDF("./Sample.pdf");
})*/
module.exports=router;
