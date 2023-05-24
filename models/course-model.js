const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId, //means it stores the unique identifier (ID) of an object in the database, indicates that the "instructor" field will reference an object ID from another collection, which is "User".
    ref: "User", //specifies that the referenced object is from the "User" collection in the database.
  },
  students: {
    //store an array of student names or IDs enrolled in a course
    type: [String], //indicating that it is an array of strings
    default: [],
  },
});

module.exports = mongoose.model("Course", courseSchema);
