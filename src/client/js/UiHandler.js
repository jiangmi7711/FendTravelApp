function updateUI(data) {

    //displays sections
    const image = document.querySelector("#image");
    image.style.display = "block";
    const results = document.querySelector("#results");
    results.style.display = "initial";
    const form = document.querySelector("#form");
    form.style.gridArea = "form";

    // populates the UI
    const daysof = (Math.round(data[3].days / (1000 * 60 * 60 * 24)) + 1);
    const city = JSON.stringify(data[2].city);
    const cityReg = `${city[1].toUpperCase(city)}${city.substring(2, (city.length -1)).toLowerCase(city)}`;
    document.querySelector("#countdown").innerHTML = `Your trip to ${cityReg}, ${data[0].geoData.countryName} is ${daysof} days away.`;
    document.querySelector("#forecast").innerHTML = `Forecast for departure date:`;
    const icons = `http://localhost:8081/client/media/icons/${data[1].weatherData.icon}.png`;
    document.querySelector("#icon").src = icons;
    document.querySelector("#temp").innerHTML = `Max temp: ${data[1].weatherData.max_temp}°C / Min temp: ${data[1].weatherData.low_temp}°C`;
    document.querySelector("#description").innerHTML = `${data[1].weatherData.description} throughout the day.`;
    // sets the 1rst img
    const photoURL = `${data[4].photoData.webformatURL}`
    document.querySelector("#imageSRS").src = `${photoURL}`;
    // sets the 2nd img
    const photoURL2 = `${data[4].photoData.webformatURL2}`
    document.querySelector("#imageSRS2").src = `${photoURL2}`;

    //summary and country facts
    document.querySelector("#tripLong").innerHTML = `Your trip will last ${data[5].tripLong} days, enjoy it!`;
    document.querySelector("#country").innerHTML = `Some facts about ${data[0].geoData.countryName}:`;
    document.querySelector("#capital").innerHTML = `${data[0].geoData.countryName}'s capital city is: ${data[6].countryData.capital}`;
    document.querySelector("#language").innerHTML = `It's language is: ${data[6].countryData.languages}`;
    document.querySelector("#currency").innerHTML = `It's currency is: ${data[6].countryData.currencies}`;

    //disables button
    document.querySelector("#button").setAttribute("disabled", "disabled");

}

//clears the UI

function clearUI() {
    document.querySelector("#city").required = false;
    document.querySelector("#departing").required = false;
    document.querySelector("#returning").required = false;
    document.querySelector("#countdown").innerHTML = "";
    document.querySelector("#forecast").innerHTML = "";
    document.querySelector("#temp").innerHTML = "";
    document.querySelector("#icon").src = "";
    document.querySelector("#description").innerHTML = "";
    document.querySelector("#tripLong").innerHTML = "";
}

function printUI() {
    window.print();
}

export {
    updateUI,
    clearUI,
    printUI
}