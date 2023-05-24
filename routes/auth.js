// for authentication-relative routes

const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").user;
const jwt = require("jsonwebtoken");
const courseValidation = require("../validation").courseValidation;

// middleware to check
router.use((req, res, next) => {
  console.log("Receiving a request about auth...");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("Successfully connect to auth route...");
});

router.post("/register", async (req, res) => {
  // First: validate input data
  //console.log(registerValidation(req.body));  check how the data looks like
  let { error } = registerValidation(req.body); //error will be null or error details
  //console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  // Second: find if the email has registered before
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send("Email address has been registered before.");

  // Third: register a new user
  let { email, username, password, role } = req.body;
  let newUser = new User({ email, username, password, role });
  try {
    let savedUser = await newUser.save();
    return res.send({
      msg: "Signing up successful!",
      savedUser,
    });
  } catch (e) {
    return res.status(500).send("Error. Unable to store an user.");
  }
});

router.post("/login", async (req, res) => {
  // First: validate input data
  //console.log(loginValidation(req.body));  check how the data looks like
  let { error } = loginValidation(req.body);
  //console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  // Second: find if the email has registered before
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) {
    return res.status(401).send("The specified user does'n exist.");
  }

  foundUser.comparePassword

});

module.exports = router;
