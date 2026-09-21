// const express = require('express');
// const cors= require("cors");
// const mongoose = require("mongoose");


// const app = express();
// app.use(express.urlencoded({extended:"true"}));
// app.use(cors());
// app.use(express.json());

// const mongodbURL = "mongodb+srv://veenatr002_db_user:veenatr002_db_New@cluster0.ycjnxeh.mongodb.net/?appName=Cluster0";
// mongoose.connect(mongodbURL)
// .then(()=>console.log("MongoDB Connected"))
// .catch(()=>console.log("MongoDB Connection Error"));


// const DataSchema = new mongoose.Schema({username:String,number:Number});
// const Data = mongoose.model("Data",DataSchema);

// app.post("/data",(req,res)=>{
//  const {username,number} = req.body;
//  const newData = new Data({username,number});
//  newData.save()
//  .then(()=>{
//     res.send("Success");
//  })
//  .catch(()=>{
//     res.send("Not connected");
//  })
// })

// // app.post('/login',(req,res)=>{
// //     let realdata = "12345"
// //     let userdata = req.body.username;
// //     // res.send(userdata);
// //     if(userdata ==realdata)
// //     {
// //         res.send("Login Successfull");
// //     }
// //     else{
// //          res.send("Wrong password");
// //     }
// // })
// // app.get('/about',(req,res)=>{
// //     res.send("welcome to home");

// // })
// // app.listen(3000,()=>console.log("server running"));

// app.listen(5000,()=>{
//     console.log("Server is running on port 5000")
// })
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

// const mongodbURL = "mongodb+srv://veenatr002_db_user:veenatr002_db_New@cluster0.ycjnxeh.mongodb.net/?appName=Cluster0";
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb connected"))
.catch(()=> console.log("not connected"));

const DataSchema = mongoose.Schema({username:String,number:Number});
const Data = mongoose.model("Data",DataSchema);

app.post("/data",(req,res)=>{
    const {username,number} = req.body;
    const newdata = new Data({username,number});
    newdata.save()
    .then(()=>res.send("Success"))
    .catch(()=>res.send("Not connected"))

})


app.listen(5000,()=>console.log("server is running on port 5000"))