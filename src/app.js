const express = require("express");
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  'https://shot-novel.vercel.app',
  'shot-novel-4ai3xfema-vatasalrohatge-uis-projects.vercel.app',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use("/api/file", postRoutes);
app.use("/api", authRoutes);
module.exports = app
