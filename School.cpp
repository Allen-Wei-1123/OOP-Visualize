#include <stdio.h>
#include <stdlib.h>
#include <iostream>
#include <algorithm>
#include <vector>
#include <queue>
#include "unordered_map"
#include <utility>
#include <string>
#include <set>
#include "School.h"

#include <emscripten/bind.h>
using namespace std; 

using namespace emscripten;
person::person(string fname,string lastn , gender g_,string id,string schoolname_){
    this->firstname = fname; 
    this->lastname = lastn ;
    this->g = g_;
    this->studentid = id;
    this->school = schoolname_;
}

string person::GetStudentID(){
    return this->studentid;
}

//student

string student::  GetStudentID(){
    return person::GetStudentID();
}

void student::  setGrade(int val){
    this->grade = val ;
}

bool student:: cmpStudents(student* target){
    return this->studentid == target->GetStudentID();
}


void student::checkType(){
    cout<<"I am a student"<<endl;
}

int student::GetGrade(){
    return this->grade;
}

//schoolclass 

SchoolClass :: SchoolClass(string classname,int tot,person* prof){
    this->name = classname;
    this->totalCapacity = tot;
    this->professor = prof; 
}

void SchoolClass::insertStudent(student *stud){
    this->students.push_back(stud); 
}

void SchoolClass::removeStudent(student *stude){
    bool check = false; 
    int ind = -1;
    auto tmp = this->students.size();
    for(int i = 0 ;i<tmp;i++){
        if(stude->cmpStudents(this->students[i])){
            ind =  i; 
        }
    }
    if(ind == -1){
        return ;
    }
    this->students.erase(this->students.begin()+ind) ;
}

void SchoolClass:: setGrade(string id,int grade){
    auto tmp = this->students;
    for(int i = 0 ;i<tmp.size();i+=1){
        if(id == this->students[i]->GetStudentID()){
            this->students[i]->setGrade(grade);
        }
    }
}

string SchoolClass::GetName(){
    return this->name; 
}
bool SchoolClass::cmpClasses(SchoolClass* target){
    return target->GetName() == this->GetName();
}

//teachers

vector<SchoolClass*> teacher:: getAllClasses(){
    return this->classes;
}

void teacher::InsertClass(SchoolClass* tmp){
    this->classes.push_back(tmp);
}

void teacher::RemoveClass(SchoolClass* tmp){
    auto all_class = this->getAllClasses();
    int ind = -1;
    for(int i = 0 ;i<all_class.size();i++){
        if(all_class[i]->cmpClasses(tmp) == true){
            ind = i;
        }
    }
    if(ind==-1)return ;
    this->getAllClasses().erase(this->getAllClasses().begin()+ind);
}

void teacher:: checkType(){
    cout<<"I am a teacher"<<endl;
}

void teacher::SetExp(int x){
    this->experiences = x; 
}

//school
School::School(string name,int id_){
    this->schoolname = name; 
    this->schoolid = id_;
}

void School:: InsertClass(SchoolClass* tmp){
    this->classes.push_back(tmp);
}

vector<SchoolClass*> School::getClasses(){
    return this->classes;
}

void School::RemoveClass(SchoolClass* target){
    auto tmp = this->getClasses();
    int ind = -1;
    for(int i = 0;i<tmp.size();i++){
        if(tmp[i]->cmpClasses(target)){
            ind = i ;
            break; 
        }
    }
    if(ind == -1) return ;
    this->getClasses().erase(this->getClasses().begin()+ind);
}




string School::getSchoolName(){
    return this->schoolname;
}


bool School::IDUsed(int id){
    return this->students[id];
}



EMSCRIPTEN_BINDINGS(my_module){
     enum_<gender>("gender")
        .value("MALE", MALE)
        .value("FEMALE", FEMALE)
        ;
    
    class_<person>("person")
    .constructor<string,string,gender,string,string>()
    .function("checkType",&person::checkType)
    .function("GetName",&person::GetName)
    .function("GetStudentID",&person::GetStudentID)
    ;
    
    class_<student , base<person> >("student")
    .constructor<string,string,gender,string,string>()
    .function("setGrade",&student::setGrade)
    .function("GetStudentID",&student::GetStudentID)
    .function("checkType",&student::checkType)
    .function("GetGrade",&student::GetGrade)
    ;

    class_<SchoolClass>("SchoolClass")
    .constructor<string,int ,person*>()
    .function("insertStudent",&SchoolClass::insertStudent,allow_raw_pointers())
    .function("removeStudent",&SchoolClass::removeStudent,allow_raw_pointers())
    .function("setGrade",&SchoolClass::setGrade)
    .function("GetName",&SchoolClass::GetName)
    .function("cmpClasses",&SchoolClass::cmpClasses,allow_raw_pointers());

    class_<teacher>("teacher")
    .constructor<string,string,gender,string,string>()
    .function("SetExp",&teacher::SetExp)
    .function("InsertClass",&teacher::InsertClass,allow_raw_pointers())
    .function("RemoveClass",&teacher::RemoveClass,allow_raw_pointers())
    .function("getAllClasses",&teacher::getAllClasses);


    class_<School>("School")
    .constructor<string,int>()
    .function("getClasses",&School::getClasses)
    .function("InsertClass",&School::InsertClass,allow_raw_pointers())
    .function("RemoveClass",&School::RemoveClass,allow_raw_pointers())
    .function("getSchoolName",&School::getSchoolName)
    .function("IDUsed",&School::IDUsed)
    ;

    register_vector<SchoolClass*>("vector<SchoolClass*>");


}

