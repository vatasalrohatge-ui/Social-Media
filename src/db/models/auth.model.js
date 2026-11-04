const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        
        unique: true
    },
    password: {
        type: String,
        required: true, 
    }
})
const authModel = new mongoose.model("Users", authSchema);
module.exports = authModel;