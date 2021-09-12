const Module = require('./School');

var express = require('express');
var app = express();
var fs = require("fs");
var newstudent;
var newSchool;

var cors = require('cors')
app.use(cors())
Module.onRuntimeInitialized = _ => {
    newstudent = new Module.student("Allen","Wei",Module.gender.MALE,"301331695","SFU");
    console.log(newstudent.GetStudentID());


    newSchool = new Module.School("SFU",1001);
    console.log(newSchool.getSchoolName())
    console.log(newSchool.IDUsed(1111))
    console.log("it is ",newSchool.getProfs().size())
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

app.use(express.json());
app.use(express.urlencoded());



app.get('/allclasses', function (req, res) {
  // res.end(newstudent.GetStudentID())

    var allclasses = newSchool['getClasses']();
    var allteachers  = newSchool['getProfs'](); 
    console.log("allteacher = ",allteachers.size())
    ans = [];
    for(var i = 0 ;i<allclasses.size();i++){
      var theclass = allclasses.get(i);
      let name;
      for(var j = 0 ;j<allteachers.size();j++){
        console.log("id is ",(allteachers.get(j)['GetStudentID']() ))
        console.log("prof id is ",(theclass['getProfID']() ))
        if(parseInt(allteachers.get(j)['GetStudentID']() )== theclass['getProfID']()){

          name = allteachers.get(j).GetName(); 
          break;
        }
      }
      console.log("name is ",name)
      ans.push({
        
        name:theclass['GetName']() , 
        
        profname:name,
        
    })

    }
    console.log(ans);
    res.send(ans);
})

app.get('/allstudents',function(req,res){
    var allstudents = newSchool['getStudents']();
    ans = [];
    for(var i = 0 ;i<allstudents.size();i++){
      var thestud = allstudents.get(i);
      ans.push({

        name : thestud.GetName(),

        id : thestud.GetStudentID(),

        


      })
    }

    res.send(ans);
})


app.get('/allteachers',function(req,res){

  var allprofs = newSchool['getProfs']();
  ans = [];
  for(var i = 0 ;i<allprofs.size();i++){
    var theprof = allprofs.get(i); 
    ans.push({

      name : theprof.GetName(),
      id : theprof.GetStudentID()

    })
  }
  res.send(ans);
})

app.post('/addClass',function(req,res) {
  console.log(req.header('Content-Type'))
  console.log(req.body);

  var class_name = req.body.classname;
  var cap_ = req.body.cap;
  var id_  = req.body.id;
  console.log(class_name,cap_,id_)
  var newclass = new Module.SchoolClass(class_name,parseInt(cap_),parseInt(id_));

  newSchool.InsertClass(newclass)

  console.log("it is now ",newSchool.getClasses().size())
})

app.post('/addStudent',function(req,res){
    var fname = req.body.firstname;
    var lname = req.body.lastname; 
    var gender = req.body.gender; 
    var id = req.body.id; 
    var schoolname = req.body.sname; 
    var newg; 
    if(gender == "male"){
      newg = Module.gender.MALE;
    }else{
      newg = Module.gender.FEMALE; 
    }
    console.log(req.body)
    var newperson = new Module.person(fname,lname,Module.gender.MALE,id,schoolname);
    newSchool.InsertStudent(newperson);
    console.log("done")
})


app.post('/addProfs',function(req,res){
  var fname = req.body.firstname;
    var lname = req.body.lastname; 
    var gender = req.body.gender; 
    var id = req.body.id; 
    var schoolname = req.body.sname; 
    var newg; 
    if(gender == "male"){
      newg = Module.gender.MALE;
    }else{
      newg = Module.gender.FEMALE; 
    }
    console.log(req.body)
    var newperson = new Module.person(fname,lname,Module.gender.MALE,id,schoolname);
    newSchool.InsertProf(newperson);
    console.log("done")
})




var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})