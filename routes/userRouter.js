const express=require("express");
const bcrypt=require("bcrypt");
const UserModel = require("../models/userModel");
const jwt=require("jsonwebtoken");

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body;
    try {
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send({"error":err})
            }else{
                const user=new UserModel({name,email,gender,password:hash});
                await user.save();
                res.send({"msg":"New user has been registered."})
            }
        })
    } catch (error) {
        res.send({"error":error})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    res.send({"error":err})
                }else{
                    const token=jwt.sign({userID:user._id,user:user.name},"masai")
                    res.send({"msg":"Logged In!!","token":token})
                }
            })
        }
    } catch (error) {
        res.send({"error":error})
    }
})


module.exports=userRouter