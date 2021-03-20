// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/

const bodyParser = require ('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require ('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
// Callback to debug
const server = app.listen(port, ()=>{console.log(`${port} is connected!`)});
// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get("/all", getData);

function getData(req, res){
//projectData = request.body;
res.send(projectData)
console.log(projectData);
};

// Post Route

app.post("/all", postData);
function postData(req, res){
newData = {
    temperature:req.body.temperature,
    date:req.body.date,
    'user response':req.body['user response']
}
projectData.push(newData);
res.send(projectData);
//projectData = request.body;
};
