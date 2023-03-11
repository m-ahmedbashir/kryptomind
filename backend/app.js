// imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const app = express();

// file imports

const userRoute = require("./Routes/user.routes");

// cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// middlewares
app.use(bodyParser.json());
app.use(fileUpload());

// Enabling cors
app.use(cors());

// user routes

app.use("/api/v1/user", userRoute);
mongoose
  .connect(
    `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@ac-59lemzy-shard-00-00.80ycpkd.mongodb.net:27017,ac-59lemzy-shard-00-01.80ycpkd.mongodb.net:27017,ac-59lemzy-shard-00-02.80ycpkd.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-ndsojp-shard-0&authSource=admin&retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT);
    console.log("Database is Connected");
    console.log(`Server is runing on port ${process.env.PORT}`);
  });
