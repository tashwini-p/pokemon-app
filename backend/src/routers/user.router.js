require("dotenv").config();
const express = require("express");
const bcrypt = require('bcrypt');
const { User } = require("../schemas/user.schema");
var jwt = require('jsonwebtoken');
const { verifyToken } = require("../middlewares/auth.middleware");
const {Blacklist} = require("../schemas/blacklist.schema")

const userRouter = express.Router();

userRouter.get("/", async (req, res)=>{
    try {
        const allUsers = await User.find();
        return res.status(200).send({msg:"User registeres successfully", users: allUsers});
    } catch (error) {
        console.log(error);
        return res.status(500).send({"msg":"Could not fetch users"});
    }
})

userRouter.post("/login", async(req, res)=>{
    const {email, password} = req.body;

    try {
        const isUserExists = await User.findOne({email:email});
        const checkPassword = await bcrypt.compare(password, isUserExists.password);
        console.log(checkPassword);

        if(checkPassword){

            const accessToken = await jwt.sign({
                data: {email: isUserExists.email, username: isUserExists.username}
              }, process.env.SECRETKEY , { expiresIn: '1h' });

            return res.status(200).send({"msg":"Login successful", "items": accessToken});
        
        } else {
            return res.status(400).send({"msg":"Email or Password might be wrong"});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({"msg":"Login failed"});
    }
})

userRouter.post("/logout", verifyToken , async (req, res) => {

    const accessToken = req.headers.authorization.split(" ")[0];

    try {
        
        const isBlacklist =  new Blacklist({ token : accessToken });
        await isBlacklist.save();
        return res.status(200).send({"msg": "Logout successful!"})

    } catch (error) {
        console.log(error);
        return res.status(500).send({"msg":"Failed to Logout"})
    }

})

userRouter.post("/register", async (req, res)=>{
    const {username, email, password, confirmPassword} = req.body;
    const saltRounds = 10;

    if(!username || !email || !password || !confirmPassword){
        return res.status(400).send({"msg":"All fields are requires to register"});
    }

    if(password!==confirmPassword){
        return res.status(400).send({"msg":"Password and Confirm Password values donot match."})
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const isUser = new User({username, email, password: hashedPassword});
        await isUser.save();
        return res.status(200).send({"msg":"User registeres successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).send({"msg":"Could not register user"});
    }
})

module.exports={
    userRouter
}