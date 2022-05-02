const mongoose = require("mongoose");

mongoose.set("useUnifiedTopology", true);
const coursedb = mongoose.connect("mongodb://localhost/coursesdb",
    {useNewUrlParser: true});
    module.exports = mongoose;

const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    courses: [ Number ]
    
});

const teacherSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    courses: [ Number ]
});

const courseSchema = new mongoose.Schema({
    courseName: String,
    courseNumber: Number,
    Students: [ String ],
    Teacher: [ String ]
});
Module.exports = coursedb, studentSchema, teacherSchema, courseSchema;