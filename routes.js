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
        }
    });
});

// Sends a token when given valid username/password

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
                const token = jwt.encode({ username: user.username}, secret);
                res.json({ token: token })
                console.log(`Successfully logged in. Token recieved: ${token}`);

                // For testing payload response
                const decoded = jwt.decode(token, secret);
                console.log("Decoded Payload: " + decoded.username)

                // display student profile on login
                aapp.get('/student/profile', (req, res) => {
                    res.render('studentprofile.ejs')
                })
            }
        }
    })
})

// Sends a token when given valid username/password

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
                // // Create a jwt token and send it back as a response
                const token = jwt.encode({ username: teacher.username}, secret);
                res.json({ token: token });
                console.log(`Successfully logged in. Token recieved: ${token}`);

                // For testing payload response
                const decoded = jwt.decode(token, secret);
                console.log("Decoded Payload: " + decoded.username);

                // Display teacher profile upon login
                app.get('/teacher/profile', (req, res) => {
                    res.render('teacherprofile.ejs');
                })
            }
        }
    })
})

module.exports = app;
