// To handle user information, so user can create an new account, modifying account info, login, etc.

const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "instructor"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// instance methods
// if this.role == "student", return true
userSchema.methods.isStudent = function () {
  return this.role == "student";
};
userSchema.methods.isInstructor = function () {
  return this.role == "instructor";
};
userSchema.methods.comparePassword = async function (password, cb) {
  // define a function which contains two parameters
  // cb = callback, which is defined in auth.js
  let result;
  try {
    // first argument is user input, second one is the one stored in DB
    result = await bcrypt.compare(password, this.password);
    return cb(null, result);
  } catch (e) {
    return cb(e, result);
  }
};

// mongoose middlewares
// Hash password if it's a new user or an old user who is changing password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    //this represents documents in mongoDB, .isNew and .isModified are methods built in "this"
    const hashValue = await bcrypt.hash(this.password, 10); //hash password
    this.password = hashValue;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
