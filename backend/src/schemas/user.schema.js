const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {type: String, require:true, unique: true},
    email : {type: String, require:true, unique: true},
    password : {type:String, require:true},
    confirmPassword : {type:String}
}, {
    versionKey:false,
    timestamps:true
})

const User = new mongoose.model("users", userSchema);

module.exports={
    User
}