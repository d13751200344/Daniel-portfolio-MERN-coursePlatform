const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth; // for registering/logining routes
const courseRoute = require("./routes").course; // for adding new courses
const passport = require("passport"); // import passport library
require("./config/passport")(passport); // for checking JWT (json web token)

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
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
); //only authorized users can access courseRoute and create new courses, so use 'JWT' strategy provided by passport middleware to check is the request header contains valid JWT; {session: false} is an option provided to the passport.authenticate() function. It indicates that the authentication strategy should not use session-based authentication. Instead, it expects the authentication credentials (JWT token) to be included with each request.

app.listen(8000, () => {
  console.log("Back-end server is listening to port 8000.");
});
