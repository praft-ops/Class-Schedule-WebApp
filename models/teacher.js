// Create a "Teacher" model from the teacherSchema schema
const db = require(coursedb);
const Teacher = mongoose.model("Teacher", db.studentSchema);

Module.export = Teacher;