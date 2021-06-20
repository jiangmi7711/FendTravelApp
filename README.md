# TRAVEL APP UDACITY

This project is to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs. 

# APIs

## Geonames

Used for getting the lat and lng of the city by passing the name of it.

## Weatherbit

Used for getting forecast weather by passing the lat and lng of the city.
This appi provides the forecast for the next 16 days in their free account, so the travel app dates are set in order to can work with the api.

## Pixabay

Used for getting the picture of the city by passing its name.

# Server

This app uses express server

# Languages and plugins

## For async fuctions to run propperly:

npm install --save @babel/polyfill
npm install --save-dev @babel/plugin-transform-runtime
npm install --save @babel/runtime

## This app use the following:

* node.js
* webpack
* webpack dev server
* cors
* axios: For posting to API
* body-parser
* NPM
* Jest
* Javascript
* Scss
* HTML

# .env

You must add the following to the .env file:

* For Geonames API: USERNAME
* For Weatherbit API: API_KEY
* For Pixabay API: API_KEY2

# Build Scripts

* npm run build-prod
* npm start
* npm run build-dev
* npm test (for testing)

# FendTravelApp

