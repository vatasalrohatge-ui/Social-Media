const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    }
})
const postModel = new mongoose.model("Posts", postSchema);
module.exports = postModel;