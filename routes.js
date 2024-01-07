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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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

//Add a new teacher to the database via teacherregister.ejs form post
app.post("/teacher/register", async (req, res) => {

    // Validate Form Fields
    if (!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName) {
        res.status(400).json({ error: "Missing username/Password/FirstName/LastName"});
        return;
    }
    // If valid, then assign request body variables to newTeacher object to mongodb
    const newTeacher = new Teacher({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        status: req.body.status
    });

    // Save newTeacher to database
    newTeacher.save(function(err) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.sendStatus(201, () => console.log(`${newTeacher}`) );
            res.render('teacherlogin.ejs');
        }
    });
});

// Validate Student login
app.post("/student/auth", function(req, res) {

    if (!req.body.username || !req.body.password) {
        res.status(401).json({error: "Missing username and/or password"});
        return;
    }

    // Get a Student from the database
    Student.findOne({ username: req.body.username }, function(err, student) {
        if (err) {
            res.status(400).send(err);
        }
        else if (!student) {
            //Username not in the database
            res.status(401).json({ error: "Bad username"});
        }
        else {
            // Check if password from database matches given password
            if (student.password != req.body.password) {
                res.status(401).json({ error: "Bad password"});
            }
            else {
                // Create a jwt token and send it back as a response
                const token = jwt.encode({ username: student.username}, secret);
                res.redirect(`http://localhost:3000/student/profile/${student._id}/${student.firstName}`);
                console.log(`Successfully logged in. Token recieved: ${token}`);

                // For testing payload response
                const decoded = jwt.decode(token, secret);
                console.log("Decoded Payload: " + decoded.username)

            }
        }
    })
})

// Validate Teacher login 
app.post("/teacher/auth", function(req, res) {

    if (!req.body.username || !req.body.password) {
        res.status(401).json({error: "Missing username and/or password"});
        return;
    }

    // Get Teacher from the database
    Teacher.findOne({ username: req.body.username }, function(err, teacher) {
        if (err) {
            res.status(400).send(err);
        }
        else if (!teacher) {
            //Username not in the database
            res.status(401).json({ error: "Bad username"});
        }
        else {
            // Check if password from database matches given password
            if (teacher.password != req.body.password) {
                res.status(401).json({ error: "Bad password"});
            }
            else {
                // Create a jwt token and send it back as a response
                const token = jwt.encode({ username: teacher.username}, secret);

                // Redirect to profile view
                res.redirect(`http://localhost:3000/teacher/profile/${teacher._id}/${teacher.firstName}`);

                // For testing payload response
                const decoded = jwt.decode(token, secret);
                console.log(`Successfully logged in. Token recieved: ${token}`);
                console.log("Decoded Payload: " + decoded.username);
        }
    }
    })
})

// Get the status of all students when given a valid token
app.get("/student/status", function(req, res) {

    // See if the X-Auth header is set
    if (!req.headers["x-auth"]) {
        return res.status(401).json({error: "Missing X-Auth header"});
    }

    // X-Auth should contain the token
    const token = req.headers["x-auth"];
    try {
        const decoded = jwt.decode(token,secret);

        // Send back all username and status fields
        Student.find({}, "student username status", function(err, students) {
            res.json(students);
        })
    }
    catch (ex) {
        res.status(401).json({ error: "Invalid JWT" });
    }
})

// Get the status of all teachers when given a valid token
app.get("/teacher/status", function(req, res) {

    // See if the X-Auth header is set
    if (!req.headers["x-auth"]) {
        return res.status(401).json({error: "Missing X-Auth header"});
    }

    // X-Auth should contain the token
    const token = req.headers["x-auth"];
    try {
        const decoded = jwt.decode(token,secret);

        // Send back all username and status fields
        Teacher.find({}, "teacher username status", function(err, teachers) {
            res.json(teachers);
        })
    }
    catch (ex) {
        res.status(401).json({ error: "Invalid JWT" });
    }
});

module.exports = app;
