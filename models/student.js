// Create a "Student" model from the studentSchema schema
const mongoose = require('mongoose');

const Student = mongoose.model("Student",{
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    teacher: Boolean
});

module.exports = Student;