const notifications = document.getElementById("notifications");
const allButtons = buttons.querySelectorAll("button");
const tab = ["sweet", "gorgeous", "handsome", "pretty", "beautiful", "amazing", "great", "wonderful", "simple", "lovely", "stunning", "slaying"];

//EVents ---------------------------------------------------------------------------
allButtons.forEach(button => button.addEventListener("click", () => {
        add(button)
    })
);

//Functions ---------------------------------------------------------------------------
function randomNumber(min, max){ return Math.floor(Math.random() * (max - min)) + min; }

function add(button){

    id = button.value;

    span = document.createElement("span");
    span.innerText =  tab[randomNumber(0, tab.length)].toUpperCase() + " !";
    span.id = id;
    
    notifications.appendChild(span);
    
    setTimeout(`document.getElementById("${id}").remove()` , 1000)
}