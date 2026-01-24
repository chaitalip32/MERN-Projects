const mongoose =require('mongoose');

const connectDB = (uri)=>{
    console.log("DB Connected");
    return mongoose.connect(uri)
}

module.exports= connectDB;