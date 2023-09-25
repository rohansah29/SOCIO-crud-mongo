const express=require("express");
const auth = require("../middleware/auth");
const PostModel = require("../models/postModel");

const postRouter=express.Router();

postRouter.post("/add",auth,async(req,res)=>{
    try {
       const post=new PostModel(req.body);
       await post.save();
       res.send({"msg":"A new post has been added."}) 
    } catch (error) {
        res.send({"error":error})
    }
})

postRouter.get("/",auth,async(req,res)=>{
    try {
        const userDevice=req.query.device;
        let post;
        if(userDevice){
            post= await PostModel.find({device: userDevice})
            res.json({post:post})
        }else{
        const userID=req.body.userID
        if(!userID){
          res.send({"error":"error"})
        }else{
          post= await PostModel.find({userID:userID})
          console.log(post)
        res.json({post:post})
        }
        }
    } catch (error) {
        res.send({"error":error})
    }
})

postRouter.patch("/update/:id",auth,async(req,res)=>{
    const {id}=req.params;
    const post=await PostModel.findOne({_id:id})
    try {
      if(req.body.userID!==post.userID){
        res.send({"msg":"you are not authorized"})
      } else{
        await PostModel.findByIdAndUpdate({_id:id},req.body)
        res.send({"msg":"post updated!!"})
      }
    } catch (error) {
        res.send({"error":error})
    }
})

postRouter.delete("/delete/:id",auth,async(req,res)=>{
    const {id}=req.params;
    const post=await PostModel.findOne({_id:id})
    console.log(post);
    try {
      if(req.body.userID!==post.userID){
        res.send({"msg":"you are not authorized"})
      } else{
        await PostModel.findByIdAndDelete({_id:id})
        res.send({"msg":"post deleted!!"})
      }
    } catch (error) {
        res.send({"error":error})
    }
})

module.exports=postRouter;
