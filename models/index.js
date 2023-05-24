// collects and exports 'user-model.js' & 'course-model.js'

module.exports = {
  user: require("./user-model"), // import user-model.js and assign it to 'user'
  course: require("./course-model"),
};
