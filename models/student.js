// Create a "Student" model from the studentSchema schema
const db = require(coursedb);
const Student = mongoose.model("Student", db.studentSchema);

Module.export = Student;