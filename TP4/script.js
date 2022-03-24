// ------------------------------------------------------------------------------------RECUP
const NEXT_YEAR = document.getElementById("NEXT_YEAR")
const JOURS = document.getElementById("jours")
const HEURES = document.getElementById("heures")
const MINUTES = document.getElementById("minutes")
const SECONDES = document.getElementById("secondes")

// Moment.js 2.29.1 - Parse, validate, manipulate, and display dates and times in JavaScript.
// diff() get the difference between two elements
// ------------------------------------------------------------------------------------FUNCTIONS
const updateCountdown = () => {
    var newYear = moment()._d.getFullYear() + 1

    const NEW_YEAR_TIME = moment(newYear, "YYYY")
    const ACTUAL_TIME = moment()
    var difference = NEW_YEAR_TIME - ACTUAL_TIME
    // if(difference == 0){
    //     clearInterval(countdown)
    //     NEXT_YEAR.parentElement.innerHTML = "HAPPY NEW YEAR !"
    //     document.querySelector(".time").innerHTML = ""
    // }

    var days = NEW_YEAR_TIME.diff(ACTUAL_TIME, "days")
    var duration = moment.duration(difference, "milliseconds")
    var hours = duration._data.hours
    var minut = duration._data.minutes
    var seconds = duration._data.seconds
    
    NEXT_YEAR.innerHTML = newYear;
    JOURS.innerHTML = days;
    HEURES.innerHTML = hours;
    MINUTES.innerHTML = minut;
    SECONDES.innerHTML = seconds;
}
// ------------------------------------------------------------------------------------EVENTS
const countdown = setInterval(updateCountdown,1000);

// const currentYear = new Date().getFullYear();
// const NewYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
// const updateCountdown = ()=>{
    // const currentTime = new Date;
    // const dif = NewYearTime - currentTime;

    // const j = Math.floor(dif/1000/60/60/24); /*en secondes/mn/h/j*/
    // const h = Math.floor(dif/1000/60/60) %24; /*en /mn*/
    // const m = Math.floor(dif/1000/60) %60; /*en /h*/
    // const s = Math.floor(dif/1000) % 60; /*en /j*/

//     jours.innerHTML = j;
//     heures.innerHTML = h;
//     minutes.innerHTML = m;
//     secondes.innerHTML = s;
// }