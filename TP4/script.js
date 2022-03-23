const jours = document.getElementById("jours")
const heures = document.getElementById("heures")
const minutes = document.getElementById("minutes")
const secondes = document.getElementById("secondes")
// ------------------------------------------------------------------------------------RECUP


const currentYear = new Date().getFullYear();
const NewYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);
// ------------------------------------------------------------------------------------EVENTS

// ------------------------------------------------------------------------------------FUNCTIONS
const updateCountdown = ()=>{
    const currentTime = new Date;
    const dif = NewYearTime - currentTime;

    const j = Math.floor(dif/1000/60/60/24); /*en secondes/mn/h/j*/
    const h = Math.floor(dif/1000/60/60) %24; /*en /mn*/
    const m = Math.floor(dif/1000/60) %60; /*en /h*/
    const s = Math.floor(dif/1000) % 60; /*en /j*/

    jours.innerHTML = j;
    heures.innerHTML = h;
    minutes.innerHTML = m;
    secondes.innerHTML = s;
}

setInterval(updateCountdown,1000);
