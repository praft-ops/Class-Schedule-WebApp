const mongoose = require("mongoose");

module.exports = mongoose;

const studentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    teacher: Boolean
});

const teacherSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    teacher: Boolean
});

const courseSchema = new mongoose.Schema({
    courseName: String,
    courseNumber: Number,
    Students: [ String ],
    Teacher: String // Only one teacher allowed per course. 
});

// export defined modules
module.exports = mongoose
module.exports = teacherSchema;
module.exports = studentSchema;
module.exports = courseSchema;