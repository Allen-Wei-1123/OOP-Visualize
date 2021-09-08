#pragma once

#include <vector>
#include <string>
#include <unordered_map>
enum gender { MALE ,FEMALE};

class person{
    private:
        std::string firstname;
        std:: string lastname; 
        gender g;
        std::string studentid;
        std:: string school ;
    public:
        person(std::string fname , std::string lastn , gender g_,std::string id,std::string schoolname);
        
        virtual void checkType() {

        }
        

        std::string GetName(){
            return this->firstname + " "+ this->lastname;
        }

        std::string GetStudentID();
};


class student:public person{
    private:

        std::string studentid;
        gender g;
        int grade; 

        std::string schoolname;
    public:
        // student(std::string name_,std::string studentid_ , gender g_,std::string schoolname_);
        
        student(std::string fname , std::string lastn , gender g_,std::string id,std::string schoolname):person( fname, lastn ,  g_, id, schoolname){

        };
        std::string GetStudentID();
        bool cmpStudents(student* right);
        void setGrade(int val);
        void checkType() override;
        int GetGrade();
       
};




class SchoolClass{
    private:
        std::string name;
        int totalCapacity;
        person* professor; 
        std::vector<student*> students; 

    public:
        
        SchoolClass(std::string classname, int tot , person* prof);

        void insertStudent(student *stud);
        void removeStudent(student *stud) ;

        void setGrade(std::string id,int grade) ; 
        
        std::string GetName();
        bool cmpClasses(SchoolClass* target);

        
};

class teacher:public person{
    private:
        std::vector<SchoolClass*> classes; 
        int experiences; 

    public:
        teacher(std::string fname , std::string lastn , gender g_,std::string id,std::string schoolname):person( fname, lastn ,  g_, id, schoolname){

        };
        void checkType();
        void SetExp(int x);
        std::vector<SchoolClass*> getAllClasses(); 
        void InsertClass(SchoolClass* tmp);
        void RemoveClass(SchoolClass* tmp); 
};

class School
{
private:
    /* data */
    std::vector<SchoolClass*> classes; 

    std::string schoolname; 
    int schoolid;

    std::unordered_map<int,bool> students;
    
public:
    School(std::string name,int schoolid);

    std::vector<SchoolClass*> getClasses();
    void InsertClass(SchoolClass* tmp);
    void RemoveClass(SchoolClass*taget);
    
    std::string getSchoolName();

    bool IDUsed(int id);

    ~School();
};

