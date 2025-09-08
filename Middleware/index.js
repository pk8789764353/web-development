const express = require("express");
const app = express();

app.use((req, res, next) => {
    console.log(req.method); next();
})

app.use("/api",(req,res,next)=>{
    let {token}=req.query;
    if(token==="abcd"){
        next();
    }
    res.send("ACCESS DENIED!");
})

app.get("/", (req, res) => {
    res.send("Hi,I am root");
})



app.get("/random", (req, res) => {
    res.send("Hi,i am random page");
})


app.get("/api",(req,res)=>{
    res.send("data");
})

app.use((req, res) => {
    res.send("Page not found!");
})


app.listen(8080, () => {
    console.log("app is listening port 8080");
})
