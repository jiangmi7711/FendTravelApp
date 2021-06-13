const bodyParser = require('body-parser');
var axios = require('axios');
var path = require('path');
const express = require('express');
var request = require("request");
const dotenv = require('dotenv');


const app = express();

app.use(express.static('dist'))
app.use(express.static('src'));

dotenv.config();

console.log(__dirname)

//.env credentials
let WeatherApiKey = process.env.API_KEY;
let geoUser = process.env.USERNAME;
let pixabayKey = process.env.API_KEY2;

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());



// TODO-ROUTES!

app.get('/', function(req, res) {
    res.sendFile('dist/index.html')
});


//Geonames API
app.post('/coords', async(req, res) => {
    try {
        const getCoords = await axios.post(`http://api.geonames.org/searchJSON?q=${req.body.city}&maxRows=1&username=pslasso`);

        const { data } = getCoords;

        const cords = {
            lat: data.geonames[0].lat,
            lng: data.geonames[0].lng,
            countryName: data.geonames[0].countryName
        };

        res.send(cords);
        console.log(data);

    } catch (error) {
        console.log(`${error}`);
    }
});

//Weatherbit API
app.post('/weather', async(req, res) => {
    console.log("req.body", req.body)
    console.log("weatherbit key", WeatherApiKey)
    try {
        const getWeather = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.body.lat}&lon=${req.body.lng}&key=${WeatherApiKey}`);

        const { data } = await getWeather;
        console.log("data", data)
        console.log("weather", data.data[0].weather)
            //Gets the number of days to departure
        const dayWeather = Math.round(req.body.days / (1000 * 60 * 60 * 24));


        const weather = {
            max_temp: data.data[dayWeather + 1].max_temp,
            low_temp: data.data[dayWeather + 1].low_temp,
            description: data.data[dayWeather + 1].weather.description,
            icon: data.data[dayWeather + 1].weather.icon
        };

        res.send(weather);
        console.log(data);

    } catch (error) {
        console.log(`${error}`);
    }
});

//Pixabay API
app.post('/photo', async(req, res) => {
    try {
        const getPhoto = await axios.get(`https://pixabay.com/api/?key=${pixabayKey}&q=${req.body.city}&image_type=photo&category=places&order=popular&orientation=horizontal`)
        const { code } = getPhoto.status;
        if (code == "200") {
            const { data } = await getPhoto;
            const photo = {
                webformatURL: data.hits[0].webformatURL,
                webformatURL2: data.hits[1].webformatURL
            };
            res.send(photo);
            console.log(data);
        } else {
            // gets a photo of the country if city isn't founded
            if (code !== "200") {
                const getPhoto = await axios.get(`https://pixabay.com/api/?key=${pixabayKey}&q=${req.body.countryName}&image_type=photo&category=places&order=popular&orientation=horizontal`)
                const { data } = await getPhoto;
                const photo = {
                    webformatURL: data.hits[0].webformatURL,
                    webformatURL2: data.hits[1].webformatURL
                };
                res.send(photo);
                console.log(data);
            }
        }

    } catch (error) {
        console.log(`${error}`);
    }
});

//Restcountries API
app.post('/country', async(req, res) => {
    try {
        const getCountry = await axios.get(`https://restcountries.eu/rest/v2/name/${req.body.countryName}`);

        const { data } = getCountry;

        const country = {
            capital: data[0].capital,
            currencies: data[0].currencies[0].name,
            languages: data[0].languages[0].name
        };

        res.send(country);
        console.log(data);

    } catch (error) {
        console.log(`${error}`);
    }
});


//Returns data from APIs
app.get("/all", (req, res) => {
    res.send(cords, weather, photo, country);
    console.log(`returning => ${cords}`);
    console.log(`weather => ${weather}`);
    console.log(`weather => ${photo}`);
    console.log(`weather => ${country}`);
});

app.use(function(req, res, next) {
    res.status(404).send('Sorry, cant find that!');
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
});

module.exports = app;