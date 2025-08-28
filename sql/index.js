const {faker}=require("@faker-js/faker");
const mysql = require('mysql2');
const express=require("express");
const app=express();
const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password:'root@123'
});
let q= "insert into user(id,username,email,password) values ?";

let createRandomUser = () =>{
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(), 
    faker.internet.password(),
    
  ];
};

// 
//HOme route
app.get("/",(req,res)=>{
  let q=`select count(*) from user`;
  try{
    connection.query(q,(err,result)=>{
        if(err) throw err;
        let a=result[0]["count(*)"];
        res.render("home.ejs",{a});
    });
}catch(err){
    console.log(err);
    res.send("some error occured");
}

});

//Get user route

app.get("/user",(req,res)=>{
  let q=`select * from user`;
  try{
    connection.query(q,(err,users)=>{
        if(err) throw err;
        res.render("user.ejs",{users});
    });
}catch(err){
    console.log(err);
    res.send("some error occured");
}

});

app.listen("8080",() =>{
  console.log("server is listening to port 8080");
});
  


// let data=[];
// for(let i=1;i<=100;i++)
// {
// data.push(createRandomUser());
// }

// try{
//     connection.query(q,[data],(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//     });
// }catch(err){
//     console.log(err);
// }
// connection.end();