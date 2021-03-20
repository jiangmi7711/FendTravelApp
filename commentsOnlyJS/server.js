// Setup empty JS object to act as endpoint for all routes
const data = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const cors = require ('cors');

/* Middleware*/
const bodyParser = require ('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
const port = 8000;
// Callback to debug
const server = app.listen(port, ()=>{console.log('connected!')});
// Initialize all route with a callback function

// Callback function to complete GET '/all'
const getData = (req, res) => {
res.send('hello')
};
app.get("/all", getData);
// Post Route
const postData = (req, res) => {
const newData = req.body;
res.send('hello');
data.push(newData);
console.log(newData, data );
};
app.get("/all", postData);