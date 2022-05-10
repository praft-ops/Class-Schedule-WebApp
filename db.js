const mongoose = require("mongoose");

// mongoose.set('useUnifiedTopology', true);
//const coursedb = mongoose.connect("mongodb://localhost/coursesdb",
//  {useNewUrlParser: true});
    module.exports = mongoose;

const studentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    teacher: Boolean,
    courses: [ Number ]
});

const teacherSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    teacher: Boolean,
    courses: [ Number ]
});

const courseSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    courseName: String,
    courseNumber: Number,
    Students: [ String ],
    Teacher: [ String ]
});

module.exports = mongoose
module.exports = teacherSchema;
module.exports = studentSchema;