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

userRouter.post("/login", async(req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const isUserExists = await User.findOne({ email: email });
        
        if (!isUserExists) {
            return res.status(404).send({"status":404,"msg": "User is not registered"}); // User is not registered
        }

        // If the user exists, check the password
        const checkPassword = await bcrypt.compare(password, isUserExists.password);
        console.log(checkPassword);

        if (checkPassword) {
            const accessToken = await jwt.sign({
                data: { email: isUserExists.email, username: isUserExists.username, id: isUserExists._id }
            }, process.env.SECRETKEY, { expiresIn: '1h' });

            return res.status(200).send({"status":200, "msg": "Login successful", "token": accessToken });
        } else {
            return res.status(400).send({"status":400, "msg": "Email or Password might be wrong" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({"status":500, "msg": "Login failed" });
    }
})


userRouter.post("/logout", verifyToken , async (req, res) => {

    const accessToken = req.headers.authorization;
    console.log(accessToken);

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
        return res.status(400).send({"msg":"All fields are required to register"});
    }

    if(password!==confirmPassword){
        return res.status(400).send({"msg":"Password and Confirm Password values donot match."})
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const isUser = new User({username, email, password: hashedPassword});
        await isUser.save();
        return res.status(200).send({"msg":"User registered successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).send({"msg":"Could not register user"});
    }
})

module.exports={
    userRouter
}