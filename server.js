var factory = require('./hello.js');
const Module = require('./School');



// factory().then((instance) => {
//   instance._sayHi(); // direct calling works
//   instance.ccall("sayHi"); // using ccall etc. also work
//   console.log(instance._daysInWeek()); // values can be returned, etc.

//     console.log(instance._calculate(10,10));

// });


Module.onRuntimeInitialized = _ => {
    var newstudent = new Module.student("Allen","Wei",Module.gender.MALE,"301331695","SFU");
    console.log(newstudent.GetStudentID());


    var newSchool = new Module.School("SFU",1001);
    console.log(newSchool.getSchoolName())
    console.log(newSchool.IDUsed(1111))
};

Module.onRuntimeInitialized = _ =>{
  var newschool = new Module.School("SFU",1234)
  var prof1 = new Module.person("Tiff","Faass", Module.gender.FEMALE,"55555","UBC");
  var class1 = new Module.SchoolClass("CMPT 125 - Intro to CS",100,prof1);
  newschool.InsertClass(class1);
  var allclass = newschool['getClasses']()
  console.log(allclass.size())

  for(var i = 0 ;i<allclass.size();i++){
    
    console.log(allclass.get(i).GetName())
  }

  newschool.RemoveClass(class1);
  console.log(newschool.getClasses().size())
  
} 


