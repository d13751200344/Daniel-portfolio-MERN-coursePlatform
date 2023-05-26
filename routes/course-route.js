// enable tutors create new courses

const router = require("express").Router();
const Course = require("../models").course;
const courseValidation = require("../validation").courseValidation;

// middleware to check if this route working or not
router.use((req, res, next) => {
  console.log("'course-route' is receiving a request...");
  next();
});

// let instructors post new courses
router.post("/", async (req, res) => {
  // Validate user information first
  // console.log(registerValidation(req.body));  check how the data looks like
  let { error } = courseValidation(req.body); //{error} will be null or error details
  //console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.user.isStudent()) {
    return res.status(400).send("Only instructors can post new courses.");
  }

  let { title, description, price } = req.body;
  try {
    let newCourse = new Course({
      title,
      description,
      price,
      instructor: req.user._id,
    });
    let savedCourse = await newCourse.save();
    return res.send({
      message: "New course has been posted successfully!",
      savedCourse,
    });
  } catch (e) {
    return res.status(500).send("Failed to post new course.");
  }
});

module.exports = router;
