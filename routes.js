// routes.js
const express = require("express");
const jwt = require('jwt-simple');
const Student = require("./models/student");
const Teacher = require("./models/teacher");
const app = express();

// For encoding/decoding JWT
const secret = "studentSecret";

//Add a new student to the database
app.post("/student/register", async (req, res) => {

    // Validate Form Fields
    if (!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName) {
        res.status(400).json({ error: "Missing username/Password/FirstName/LastName"});
        return;
    }
    // Assign request body variables to newStudent object
    const newStudent = new Student({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    });

    // Save newStudent to database
    newStudent.save(function(err) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.sendStatus(201, () => console.log(`${newStudent}`) );
        }
    });
});

//Add a new teacher to the database
app.post("/teacher/register", async (req, res) => {

    // Validate Form Fields
    if (!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName) {
        res.status(400).json({ error: "Missing username/Password/FirstName/LastName"});
        return;
    }
    // Assign request body variables to newTeacher object
    const newTeacher = new Teacher({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    });

    // Save newTeacher to database
    newTeacher.save(function(err) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.sendStatus(201, () => console.log(`${newTeacher}`) );
        }
    });
});

module.exports = app;
// Sends a token when given valid username/password
