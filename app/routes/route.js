var express=require('express');
var bodyparser=require('body-parser');
var connection=require('../model/database.js');
const router=express.Router()
router.use(bodyparser.json());

//Checking database Connection
connection.connect((err)=>
{
    if(!err)
    console.log('Database connected');
    else
    console.log("check the connection"+JSON.stringify(err,undefined,2));
});

//Read user
router.get('/info',(req,res) => {
    connection.query('SELECT student_information.Student_name,student_information.Student_Rollno,student_personal.Student_Email,student_personal.Student_DateOfBirth,student_personal.Student_Hobbies, student_information.Student_Department from student_information INNER JOIN student_personal where student_information.Student_Rollno=student_personal.Student_Rollno ORDER BY Student_Rollno;',(err,rows,fields)=>{
        if(!err)
        res.json(rows);
        else
        console.log(err);
    })
});
router.get('/info/:id',(req,res) => {
    connection.query('SELECT * FROM student_information WHERE Student_Rollno= ?',[req.params.id],(err,rows) => {
        if(!err)
        res.json(rows);
        else
        console.log(err);
    })
});
router.get('/personal/:id',(req,res) => {
    connection.query('SELECT * FROM student_personal WHERE Student_Rollno= ?',[req.params.id],(err,rows) => {
        if(!err)
        res.json(rows);
        else
        console.log(err);
    })
});

//Delete user
router.delete('/info/:id',(req,res) => {
    connection.query('DELETE from student_information WHERE Student_Rollno= ? ',[req.params.id],(err,rows) => {
        if(!err){
            res.send({
                "status":"200",
                "message":"Deleted successfully"
    
            })
        }
        else
        res.send({
            "status":"404",
            "message":"page not found"
        })
    })
});
router.delete('/personal/:id',(req,res) => {
    connection.query('DELETE from student_personal WHERE Student_Rollno= ? ',[req.params.id],(err,rows) => {
        if(!err){
            res.send({
                "status":"200",
                "message":"Deleted successfully"
    
            })
        }
        else
        res.send({
            "status":"404",
            "message":"page not found"
        })
    })
});

//Create user
router.post('/createInfo',(req,res) => {
    const params=req.body
    connection.query('INSERT INTO student_information  SET ?',params,(err,rows) => {
        if(!err){
            res.send({
                "status":"200",
                "message":"Created successfully"
    
            })
        }
        else
        res.send({
            "status":"404",
            "message":"page not found"
        })
    })
});
router.post('/createPersonal',(req,res) => {
    const params=req.body
    connection.query('INSERT INTO student_personal  SET ?',params,(err,rows) => {
        if(!err){
            res.send({
                "status":"200",
                "message":"Created successfully"
    
            })
        }
        else
        res.send({
            "status":"404",
            "message":"page not found"
        })
    })
});

//Update user
router.put('/updateInfo',(req,res) => {
    const params=req.body
    const{Student_Name,Student_Rollno,Student_Department}=req.body
    connection.query('UPDATE student_information SET Student_Name = ?, Student_Department= ? WHERE  Student_Rollno= ?',[Student_Name,Student_Department,Student_Rollno],(err,rows) => {
        if(!err){
            res.send({
                "status":"200",
                "message":"Updated successfully"
    
            })
        }
        else
        res.send({
            "status":"404",
            "message":"page not found"
        })
        
    })
});


module.exports=router;

