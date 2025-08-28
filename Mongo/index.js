const mongoose =require ("mongoose");
main()
.then((res)=>{
    console.log("connection successful");
})
.catch((err)=> console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test")
}

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
});

const User=mongoose.model("User",userSchema);
// const Employee=mongoose.model("Employee",userSchema);

// const user1=new User({
// name:"Adam",
// email:"abv@gmail.com",
// age:90,
// });

// user1.save();

// const user2=new User({
// name:"eve",
// email:"abv@khj.com",
// age:80,
// })

// user2.save()
// .then((res)=>{
//     console.log(res);

// })
// .catch((err)=>
// {
//     console.log(err);
// })

User.find({age:{ $gt: 9}})
.then((res)=>{
    console.log(res);
})
.catch((err)=>{
    console.log(err)
})