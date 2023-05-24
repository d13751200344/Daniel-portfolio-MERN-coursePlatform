const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;

// connect to mongoDB
mongoose
  .connect("mongodb://127.0.0.1/GoogleDB")
  .then(() => {
    console.log("Connecting to mongoDB...");
  })
  .catch((e) => {
    console.log(e);
  });

// middlewares
app.use(express.json()); //parsing JSON data from incoming requests, making it available in req.body for further processing.
app.use(express.urlencoded({ extended: true })); //used to handle HTTP POST requests submitted from HTML forms, parsing URL-encoded data from incoming requests. The extended: true option allows for complex objects and arrays to be URL-encoded. If set to false, only key-value pairs will be parsed.

app.use("/api/user", authRoute); //every req happen on route of first argument will go to "authRoute"

app.listen(8000, () => {
  console.log("Back-end server is listening to port 8000.");
});
