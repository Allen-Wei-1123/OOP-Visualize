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

  };
