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
    console.log(newSchool.IDUsed(1111))
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



app.get('/listUsers', function (req, res) {
  res.end(newstudent.GetStudentID())
  
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})