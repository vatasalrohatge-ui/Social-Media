const express = require("express");
const multer = require('multer')
const router = express.Router();
const postController = require("../controllers/posts.controller")
const upload = multer({storage: multer.memoryStorage()});
router.post("/create-posts", upload.single("file"), postController.createPost);
router.get("/get-posts", postController.getPosts);

module.exports = router;
