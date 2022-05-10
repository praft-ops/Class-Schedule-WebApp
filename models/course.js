// Create a "Course" model from the courseSchema schema
const mongoose = require("mongoose");

const Course = mongoose.model("Course",{
    username: { type: String, required: true },
    password: { type: String, required: true },
    courseName: String,
    courseNumber: Number,
    Students: [ String ],
    Teacher: [ String ]
});
module.exports = Course;