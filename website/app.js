/* Global Variables */
const key = '27d891e24ae7e45915dfc2b0bf25efc9&units=imperial';
const api = 'https:api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
//Create an event listener for the element with the id: generate
document.getElementById('generate').addEventListener('click', performAction);
//api request
function performAction(e){
    const zip = document.getElementById('zip').value;//!!! get dom zip
    getWeather(api, key, zip)
    .then(function(data){
        let userResponse = document.getElementById('feelings').value;//!!! get dom userresponse
        postData('/all',{temperature: data.main.temp, date: newDate, 'user response': userResponse});
       // updateUI()
    })
    .then(function() {
      updateUI()
    });  
}

const getWeather = async(api, key, zip)=>{
    //api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}
    const url = api + zip + ',us&appid='+ key;
    const res = await fetch(url);
    try {
        const data = await res.json();
        console.log(data)
        return data;
      }  catch(error) {
        console.log("error", error)};
};


// After your successful retrieval of the weather data, you will need to chain another Promise that makes a POST request to add the API data, as well as data entered by the user, to your app.
// Async POST
const postData = async (url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),       
  });
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};


// Update UI
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    console.log(allData)
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temperature;
    document.getElementById('content').innerHTML = allData['user response'];

  }catch(error){
    console.log("error", error);
  }
}