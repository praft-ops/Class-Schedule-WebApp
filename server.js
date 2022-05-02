const express = require("express")
const app = express()
const bodyParser = require('body-parser');

// Set Body parser for app to use req.body properties 
app.use(bodyParser.urlencoded({ extended: false} ));

// Set App ejs view engine to render index.ejs to the client
app.set('view-engine', 'ejs') 

//Middleware that parses HTTP request with JSON body
app.use(express.json());

// Request Teacher Login Form 
app.get('/teacher/login', (req ,res) => {
    res.render('teacherlogin.ejs')
})
// Request Teacher Register Form
app.get('/teacher/register', (req, res) => {
    res.render('teacherregister.ejs')
})

// Request Teacher Profile Form 
app.get('/teacher/profile', (req, res) => {
    res.render('teacherprofile.ejs');
})

// Request Student Profile
app.get('/student/profile', (req, res) => {
    res.render('studentprofile.ejs')
})

// Request Student Register Form 
app.get('/student/register', (req, res) => {
    res.render('studentregister.ejs');
})

// Request Student Login Form 
app.get('/student/login', (req, res) => {
    res.render('studentlogin.ejs')
})

const port = 3000 

app.listen(port, () => console.log(`This app is listening on port ${port}`));