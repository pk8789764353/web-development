const mongoose=require("mongoose");
const Chat=require("./models/chats.js");

main()
.then(res=> console.log("connection succesfull"))
.catch(err=> console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats=[
    {
    from:"priyanshu",
    to:"tarun",
    msg:"u are my best buddy",
    created_at:new Date()
    },
    {
    from:"ji",
    to:"java",
    msg:"a quick brown fox",
    created_at:new Date()
    },
    {
    from:"blue",
    to:"fox",
    msg:"jumps over a very lazy dog",
    created_at:new Date()
    },
    {
    from:"ravan",
    to:"tuntun",
    msg:"ladoo kab khilaogi",
    created_at:new Date()
    }

];
Chat.insertMany(allChats);


