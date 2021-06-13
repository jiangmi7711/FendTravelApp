// set the max input date of departing to 16 days of current date, 
//in order to work fine with the api wich its forecast its limited to 16 days

function setMaxDate() {
    let date = new Date();
    let max = (date.getTime() + (16 * (1000 * 60 * 60 * 24)));
    let maxDate = new Date(max);
    let input = document.getElementById("departing");
    input.min = new Date().toISOString().split("T")[0]; // set the min departure date to current
    input.max = maxDate.toISOString().split("T")[0];

}

// sets the min returning date as the departure date

function setReturning() {

    document.getElementById("departing").addEventListener("blur", getValue);

    function getValue() {
        let returningDate = document.getElementById("departing").value;
        console.log(returningDate)
        let minReturning = document.getElementById("returning").min = returningDate;
    }

}



setReturning();
window.onload = setMaxDate();


export {
    setMaxDate,
    setReturning
}