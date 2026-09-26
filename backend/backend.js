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
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use("/uploads",express.static("uploads"))

const storage = multer.diskStorage(
    {
        destination: (req,file,cb) => {
            cb(null,"uploads/")
        },
        filename: (req,file,cb) => {
            cb(null,Date.now() + path.extname(file.originalname))
        }
    }
)

const upload = multer({ storage });

// const mongodbURL = "mongodb+srv://veenatr002_db_user:veenatr002_db_New@cluster0.ycjnxeh.mongodb.net/?appName=Cluster0";
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb connected"))
.catch((error) => {
    console.log("MongoDB connection error:");
    console.log(error);
});

const DataSchema = mongoose.Schema({username:String,number:Number,image:String});
const Data = mongoose.model("Data",DataSchema);

app.post("/data",upload.single("image"),(req,res)=>{

    const {username,number} = req.body;

    const newdata = new Data({
        username:username,
        number:Number(number),
        image:req.file ? req.file.filename : "",

    });
    newdata.save()
    .then(()=>res.send("Data and Image uploaded successfully"))
    .catch(()=>res.send("Not connected"))

})


app.get("/data",(req,res)=>{
    Data.find()
    .then((data)=>res.json(data))
    .catch(()=>res.send("error"))
})


app.put("/data/:id",upload.single("image"),(req,res)=>{
    const {username,number} = req.body

    const updateData = {
        username:username,
        number:Number(number),
    } 
    if(req.file){
        updateData.image = req.file.filename;
    }
    Data.findByIdAndUpdate(
        req.params.id,
        updateData, {new:true}
    )
    .then((updatedData)=>{
        res.json(updatedData);
    })
    .catch((error)=>
    {
        console.log(error);
        res.status(500).send("Erro updating data");
    })
})

app.delete("/data/:id", (req,res)=> {
    Data.findByIdAndDelete(req.params.id)
    .then((deletedData)=>{
        if(!deletedData){
            return res.status(404).send("data not found");
        }
        res.send("Data deleted Successfully");

    })
    .catch((error)=>{
        console.log("error",error);
        res.status(500).send("Error deleting data");

    })
})

app.listen(5000,()=>console.log("server is running on port 5000"))