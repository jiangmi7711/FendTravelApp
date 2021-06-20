const bodyParser = require('body-parser');
var axios = require('axios');
var path = require('path');
const express = require('express');
var request = require("request");
const dotenv = require('dotenv');

// Set up an instance of app
const app = express();
// Require Express to run server and routes
app.use(express.static('dist'))
app.use(express.static('src'));

dotenv.config();

console.log(__dirname)

//get API and username from .env 
let WeatherApiKey = process.env.API_KEY;
let geoUser = process.env.USERNAME;
let pixabayKey = process.env.API_KEY2;

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance - allows requesting from a domain outside its own origin domain
const cors = require('cors');
app.use(cors());


//Point our app to the folder we want to look at - connect server side code to client side code
app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
});


//Geonames API
app.post('/coords', async(req, res) => {
    try {
        const getCoords = await axios.post(`http://api.geonames.org/searchJSON?q=${req.body.city}&maxRows=1&username=jiangm7711`);
      
        const { data } = getCoords;

        const cords = {
            lat: data.geonames[0].lat,
            lng: data.geonames[0].lng,
            countryName: data.geonames[0].countryName
        };

        res.send(cords);
        console.log(data);

    } catch (error) {
        console.log("There was an error", error);
    }
});

//Weatherbit API - get high, low and weather descption
app.post('/weather', async(req, res) => {
    console.log("req.body", req.body)
    console.log("weatherbit key", WeatherApiKey)
    try {
        const getWeather = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.body.lat}&lon=${req.body.lng}&key=${WeatherApiKey}`);

        const { data } = await getWeather;
        console.log("data", data)
        console.log("weather", data.data[0].weather)
            //Gets the number of days to departure
        const dayWeather = Math.round(req.body.days / (1000 * 60 * 60 * 24)) + 1;
        const weather = {
            max_temp: data.data[dayWeather].max_temp, //+1 
            low_temp: data.data[dayWeather].low_temp,
            description: data.data[dayWeather].weather.description,
            icon: data.data[dayWeather].weather.icon
        };

        res.send(weather);
        console.log(data);

    } catch (error) {
        console.log("There was an error", error);
    }
});

//Pixabay API - get images based on city inputs
app.post('/photo', async(req, res) => {
    try {
        const getPhoto = await axios.get(`https://pixabay.com/api/?key=${pixabayKey}&q=${req.body.city}&image_type=photo&category=places&orientation=horizontal`)
        const { code } = getPhoto.status;
        if (code == "200") {
            const { data } = await getPhoto;
            const photo = {
                webformatURL: data.hits[0].webformatURL
            };
            res.send(photo);
            console.log(data);
        } else {
            // gets a photo of the country if city isn't founded
            if (code !== "200") {
                const getPhoto = await axios.get(`https://pixabay.com/api/?key=${pixabayKey}&q=${req.body.countryName}&image_type=photo&category=places&orientation=horizontal`)
                const { data } = await getPhoto;
                const photo = {
                    webformatURL: data.hits[0].webformatURL
                };
                res.send(photo);
                console.log(data);
            }
        }
    } catch (error) {
        console.log("There was an error", error);
    }
});


app.get("/all", (req, res) => {
    res.send(cords, weather, photo);
    console.log(`returning => ${cords}`);
    console.log(`weather => ${weather}`);
    console.log(`weather => ${photo}`);
});


app.listen(8081, function() {
    console.log('running on localhost:8081!')
});

module.exports = app;