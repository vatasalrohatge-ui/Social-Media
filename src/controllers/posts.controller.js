require("dotenv").config()
const postModel = require("../db/models/posts.model");
const jwt = require("jsonwebtoken");
const cloudStorage = require('../services/cloud.storage');

async function createPost(req,res) {
    try{
        const {caption} = req.body;
        const file = req.file
        const token = req.cookies.token

        try{
            jwt.verify(token, process.env.JWT_SECRET_KEY);

        } catch(err){

            res.status(403).json({
                message: "Unauthorized"
            })
        }

        if(!token){
              res.status(403).json({
                message: "Unauthorized"
            })
        }
        const uploadResponse = await cloudStorage(file.buffer, file.originalname)
        const post = postModel.create({
            url: uploadResponse.url,
            caption: caption
        })
        res.status(201).json({
            message: "Post created successfully",
        })
        
    }catch(err){
          res.status(500).json({
            message: "Internal Server Error",
            error: err
        })
}
}
async function getPosts(req,res) {
    try{
        const posts = await postModel.find();
        res.json({
            posts
        });
    } catch(err){
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

module.exports = {createPost, getPosts}
