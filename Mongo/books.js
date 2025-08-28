const mongoose=require("mongoose");
main()
.then((res)=>{
    console.log("connection succesful");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/amazon")
}

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:String,

    price:Number
});

 const Book=mongoose.model("Book",bookSchema);

 const Book1=new Book({
    title:"Meri Kahani",
    author:"Premchand",
    price:80
 });
 Book1.save();