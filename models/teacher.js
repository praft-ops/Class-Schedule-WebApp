// Create a "Teacher" model from the teacherSchema schema
const mongoose = require('mongoose');

const Teacher = mongoose.model("Teacher",{
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    teacher: Boolean
});

module.exports = Teacher;