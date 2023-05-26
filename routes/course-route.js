// enable tutors create new courses

const router = require("express").Router();
const Course = require("../models").course;
const courseValidation = require("../validation").courseValidation;

// middleware to check if this route working or not
router.use((req, res, next) => {
  console.log("'course-route' is receiving a request...");
  next();
});

// get all courses in the system
router.get("/", async (req, res) => {
  try {
    let courseFound = await Course.find({})
      .populate("instructor", ["username", "email"])
      .exec();
    // query obj can use ".populate()" to find what information is contained in id (if no '.populate()', the value of instructor would be id)
    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// get a specified course by its id
router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let courseFound = await Course.findOne({ _id }) // ={_id:_id}
      .populate("instructor", ["username", "email"])
      .exec();
    return res.send(courseFound);
  } catch (e) {
    return res.status(400).send({
      message: "The course id doesn't exist or unexpected error.",
      error: e,
    });
  }
});

// let instructors post new courses
router.post("/", async (req, res) => {
  // Validate user information first
  // console.log(courseValidation(req.body));  check how the data looks like
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

// modify courses
router.patch("/:_id", async (req, res) => {
  // Validate user information first
  // console.log(courseValidation(req.body));  check how the data looks like
  let { error } = courseValidation(req.body); //{error} will be null or error details
  //console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  // make sure the course exists in the system
  let { _id } = req.params;
  try {
    let courseFound = await Course.findOne({ _id });
    if (!courseFound) {
      return res.status(400).send("The course id doesn't exist in the system.");
    }

    // The course can only be modified by the poster (instructor)
    if (courseFound.instructor.equals(req.user._id)) {
      let updatedCourse = await Course.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      }).populate("instructor", ["username", "email"]);
      return res.send({
        message: "The course has been updated.",
        updatedCourse,
      });
    } else {
      return res
        .status(403)
        .send("The course can only be modified by the instructor.");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

// delete course
router.delete("/:_id", async (req, res) => {
  // make sure the course exists in the system
  let { _id } = req.params;
  try {
    let courseFound = await Course.findOne({ _id }).exec();
    if (!courseFound) {
      return res.status(400).send("The course id doesn't exist in the system.");
    }

    // The course can only be modified by the poster (instructor)
    if (courseFound.instructor.equals(req.user._id)) {
      await Course.deleteOne({ _id }).exec();
      return res.send("The course has been deleted successfully.");
    } else {
      return res
        .status(403)
        .send("The course can only be deleted by the instructor.");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
