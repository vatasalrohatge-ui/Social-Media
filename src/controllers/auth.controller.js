const authModel = require("../db/models/auth.model");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const bcrypt = require("bcrypt")
async function register(req,res) {
    try{
        if (!req.body || !req.body.username || !req.body.password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const password = req.body.password;
        const username = req.body.username;
    
        const isUserAlreadyExists = await authModel.findOne({
            username: username
        })
        if(isUserAlreadyExists){
            res.status(403).json({
                message: "User Already Exists"
            })
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const User = await authModel.create({
            username,
            password: hashedPassword
        })
        
        const token = jwt.sign({
            id: User._id
        }, process.env.JWT_SECRET_KEY)
        res.cookie("token", token)
    
        res.status(201).json({
            message: "User Created Successfully"
        })
    }catch(err){
        console.error(err)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

}
async function logIn(req,res) {
    const {username, password} = req.body;

    try {
      
        const user = await authModel.findOne({
            username: username,
        })
        if(!user){
            return res.status(403).json({
                message: "User not exists"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        const newToken = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET_KEY)

        res.cookie("token", newToken)
        
        res.status(200).json({
            message: "User Logged In Sucessfully",
        })
        


    }catch(err){
        console.error(err)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
module.exports = {register, logIn}