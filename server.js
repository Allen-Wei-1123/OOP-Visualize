const Module = require('./School');

var express = require('express');
var app = express();
var fs = require("fs");
var newstudent;
var newSchool;
Module.onRuntimeInitialized = _ => {
    newstudent = new Module.student("Allen","Wei",Module.gender.MALE,"301331695","SFU");
    console.log(newstudent.GetStudentID());


    newSchool = new Module.School("SFU",1001);
    console.log(newSchool.getSchoolName())
    var prof1 = new Module.person("Tiff","Faass", Module.gender.FEMALE,"55555","UBC");
    var class1 = new Module.SchoolClass("CMPT 125 - Intro to CS",100,prof1,1234);
    newSchool.InsertClass(class1);
};

// Module.onRuntimeInitialized = _ =>{
//   var newschool = new Module.School("SFU",1234)
//   var prof1 = new Module.person("Tiff","Faass", Module.gender.FEMALE,"55555","UBC");
//   var class1 = new Module.SchoolClass("CMPT 125 - Intro to CS",100,prof1);
//   newschool.InsertClass(class1);
//   var allclass = newschool['getClasses']()
//   console.log(allclass.size())

//   for(var i = 0 ;i<allclass.size();i++){
    
//     console.log(allclass.get(i).GetName())
//   }

//   newschool.RemoveClass(class1);
//   console.log(newschool.getClasses().size())
// } 



app.get('/classes', function (req, res) {
  // res.end(newstudent.GetStudentID())
  var allclass =  newSchool['getClasses']()
  // res.end(0)
  var arrs = [];
  for(var i = 0 ;i<allclass.size();i+=1){
    var obj = {name:allclass.get(i).GetName() , id : allclass.get(i).getClassID()}
    arrs.push(obj);
  }
  res.send(arrs);
})

app.get('/professors',function(req,res){
  var allprofs = newSchool['getProf']()

  var arrs = [];
  for(var i = 0 ;i<allprofs.size();i+=1){
    var obj = {name : allprofs.get(i).GetName(),exp:allprofs.get(i).getExperience()}
    arrs.push(obj)
  }
  res.send(arrs);

})






var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})