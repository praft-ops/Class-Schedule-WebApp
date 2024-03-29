const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");
const app = express();

const bodyParser = require('body-parser');

// Set Body parser for app and router to use req.body properties 
app.use(bodyParser.urlencoded( { extended: false} ));
Router.use(bodyParser.urlencoded( { extended: false} ));

//Middleware that parses HTTP request with JSON body
app.use(express.json());

//Connect to MongoDB Instance
const username = "praft";
const password = "Plokij90"
const URI = `mongodb+srv://${username}:${password}@classdb.hafcnj9.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(`${URI}`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully to MongoDB database named \"coursecluster\"");
})

// Set App ejs view engine to render index.ejs to the client
app.set('view-engine', 'ejs');

// Request Teacher Login Form 
app.get('/teacher/login', (req ,res) => {
    res.render('teacherlogin.ejs')
})
// Request Teacher Register Form
app.get('/teacher/register/view', (req, res) => {
    res.render('teacherregister.ejs')
})

// Request Teacher Profile Form 
app.get('/teacher/profile/:_id/:firstName', (req, res) => {
    res.render('teacherprofile.ejs');
})

// Request Student Profile
app.get('/student/profile/:_id/:firstName', (req, res) => {
    res.render('studentprofile.ejs')
})

// Request Student Register Form 
app.get('/student/register/view', (req, res) => {
    res.render('studentregister.ejs');
})

// Request Student Login Form 
app.get('/student/login', (req, res) => {
    res.render('studentlogin.ejs')
})

// Define router to use api directory for route calls
app.use(Router);

const port = 3000 

app.listen(port, () => console.log(`This app is listening on port ${port}`));