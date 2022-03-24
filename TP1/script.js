const notifications = document.getElementById("notifications");
const allButtons = buttons.querySelectorAll("button");
const tab = ["sweet", "gorgeous", "handsome", "pretty", "beautiful", "amazing", "great", "wonderful", "simple", "lovely", "stunning", "slaying"];

//Events ---------------------------------------------------------------------------
allButtons.forEach(button => button.addEventListener("click", () => {
        add(button)
    })
);

//Functions ---------------------------------------------------------------------------
function randomNumber(min, max){ return Math.floor(Math.random() * (max - min)) + min; }

let i=0
function add(button){

    id = i++;

    span = document.createElement("span");
    span.id = id;
    span.setAttribute("class", button.value)
    span.innerText =  tab[randomNumber(0, tab.length)].toUpperCase() + " !";
    
    notifications.appendChild(span);
    
    setTimeout(`document.getElementById("${id}").remove()` , 1000)
}

// Accéder via du code JavaScript
// var article = document.getElementById('voitureelectrique');
// ex: article.dataset.columns