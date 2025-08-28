const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chats.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
    .then(res => console.log("connection succesfull"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//all chats route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs", { chats });
})
//route to add chats
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat.save().then((res) => {
        console.log(res);
    })
        .catch((err) => {
            console.log(err);
        })

    res.redirect("/chats");
})

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

app.get("/", (req, res) => {
    res.send("sflkjsf");
})
//Edit route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
})
//Update route
app.put("/chats/:id/", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        { msg: newMsg }, { runValidators: true, new: true }
    );
    console.log(updatedChat);
    res.redirect("/chats");

})

//Delete route
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})


app.listen(8080, () => {
    console.log("app is listening to port 8080");
})