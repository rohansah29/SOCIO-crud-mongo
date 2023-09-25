const express=require("express");
const cors=require("cors");
const connection = require("./db");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");

 const app=express();
 app.use(express.json())
 app.use(cors());
 app.use("/users",userRouter)
 app.use("/posts",postRouter)

 app.listen(8080,async()=>{
    try {
        await connection;
        console.log("Connected to DB.")
       console.log("Server is running on port 8080") 
    } catch (error) {
        console.log(error);
    }
 })