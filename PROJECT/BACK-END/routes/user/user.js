const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dbconfig = {
    host: "localhost",
    port: "3306",         //db 전용 포트
    user: "root",
    password: "dbswnsvoa353",
        //todo :: database: "bibimbapstudy"

    // database: "university",
};
const connection = mysql.createConnection(dbconfig);

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");       //git.ignor 해야함

const users = {};
const jwtSecret = "qwert"; 


router.post("/login",(req,res,next)=>{
    let id = req.body.userid;
    let pw = req.body.userpw;
    let hashed = await bcrpt.hash(pw,10);
    let newUserToken = jwt.sign({id},jwtSecret,{
        expiresIn : 15*60
    });


    let query = `
    select * from user where id=${id} and pw = '${pw}'
    ;`;
    connection.query(query, (err, rows) => {
        if(rows.length !=0 ) res.status(200).send("1");
        else res.status(200).send("0");

        if (err) console.log(err);
        else console.log("createComment");
    });

    res.cookie("2team-Token",newUserToken);
    res.status(200).send();      
});


router.post("/", (req, res, next) => {
    let id = req.body.userid;
    let pw = req.body.userpw;
    let query = `
    insert into user(id,pw) values
    ('${id}','${pw}')
    ;`;
    connection.query(query, (err, rows) => {
        if (err) console.log(err);
        else console.log("createComment");
    });
    res.redirect("/");
});




//todo :: 중복 체크

// router.all("/validate/:id", (req, res, next) => {
//     let id = req.params.userid;

//     let query = `
//     select id from user where id=${id}
//     ;`;
//     connection.query(query, (err, rows) => {
//         if(rows==null)res.status(200).send("1");
//         else res.status(200).send("0");

//         if (err) console.log(err);
//         else console.log("createComment");
//     });
//     res.redirect("/");
// });

module.exports = router;