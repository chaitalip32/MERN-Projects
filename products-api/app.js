require('dotenv').config()
const express= require('express')
const app=express()
const product_routes= require("./Routes/products")
const connectDB=require('./db/connect')
PORT=process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("Hi, I am connected");
});

app.use("/api/products",product_routes)

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, ()=>{
            console.log(`Server listening on port ${PORT}`)
        })
    }catch(err){
        console.log(err);
    }
};

start();