// Create a "Course" model from the courseSchema schema
const db = require(coursedb);
const Course = mongoose.model("Course", db.courseSchema);

Module.export = Course;