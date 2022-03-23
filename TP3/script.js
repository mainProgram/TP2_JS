//--------------------------------------------------------------------------------------------------DECLARATIONS
const zoom_result = document.querySelector(".img-zoom-result")
const slides = document.querySelector(".slides")
const slider = document.querySelector(".slider")
const left = document.querySelector("#left")
const right = document.querySelector("#right")
const length = 11

//--------------------------------------------------------------------------------------------------HTML STRUCTURATION
//INPUTS RADIO
for (let i = 1; i <= length; i++) {
    input = document.createElement("input")
    input.setAttribute("type", "radio")
    input.setAttribute("name", "radio")
    input.setAttribute("id", "radio"+i)
    if(i==1)
        input.setAttribute("checked", true)

    slides.appendChild(input)
}

//IMAGES
for (let i = 1; i <= length; i++) {
    div = document.createElement("div")
    div.classList.add("slide")
    if(i==1)
        div.classList.add("first")

    img = document.createElement("img")
    img.setAttribute("src", "img/img"+i+".jpg")
    img.setAttribute("alt", "flowers")
    img.setAttribute("id", "img"+i)

    div.appendChild(img)
    slides.appendChild(div)
}

const navigationAuto = document.createElement("div")
navigationAuto.setAttribute("class", "navigation-auto")
for (let i = 1; i <= length; i++) {
    //DIV AUTO
    div = document.createElement("div")
    div.classList.add("auto"+i)

    navigationAuto.appendChild(div)
    slides.appendChild(navigationAuto)
}  


const navigationManual = document.createElement("div")
navigationManual.setAttribute("class", "navigation-manual")
for (let i = 1; i <= length; i++) {
    //DIV MANUAL
    label = document.createElement("label")
    label.classList.add("manual")
    label.setAttribute("for", "radio"+i)

    navigationManual.appendChild(label)
    slides.appendChild(navigationManual)
}  

//--------------------------------------------------------------------------------------------------EVENTS
//EVERY 5 SECONDS SHOW AN IMG
var compteur = 1;
setInterval(function(){
    document.getElementById("radio" + compteur).checked = true;
    
    compteur++;

    if(compteur > length){
        compteur = 1
        right.style.display = "none"
    }
    else if(compteur - 1  == 1){
        left.style.display = "none"
        right.style.display = "block"
    }
    else{
        left.style.display = "block"
        right.style.display = "block"
    }
      
}, 3000);

//EVERY 5 SECONDS ZOOM FOT ALL IMAGES
const allImages = slides.querySelectorAll("img");
allImages.forEach((image, i) => image.addEventListener("mousemove", () => {
        zoom_result.style.display = "block";
        imageZoom("img"+(i+1), "myresult");
    })
)

//REMOVE THE ZOOM RESULT
window.addEventListener("mouseover", (e)=>{
    if(e.target == document.body)
        zoom_result.style.display = "none"
    else
        return false;
    console.log(e.target)
})

//WHEN I CLICK ON A RADIO STAY THERE N UPDATE COMPTEUR
const labels = document.querySelectorAll("label")
labels.forEach((label, i) => label.addEventListener("click", () => {
        document.getElementById("radio"+(i+1)).checked = true;
        compteur = i + 1
        // console.dir(label.control.checked)
    })
)

var id = 0
// WHEN I CLICK ON THE RIGHT BUTTON
right.addEventListener("click", ()=>{
    labels.forEach((label, i) => {
        if(label.control.checked == true){
            id = i+2
            return false
        }
    })
    suivant = document.getElementById("radio"+id)
    suivant.checked = true
    compteur = id
})

// WHEN I CLICK ON THE RIGHT BUTTON
left.addEventListener("click", ()=>{
    labels.forEach((label, i) => {
        if(label.control.checked == true){
            id = i
            return false
        }
    })
    precedent = document.getElementById("radio"+id)
    precedent.checked = true
    compteur = id
})

//--------------------------------------------------------------------------------------------------FUNCTIONS
function imageZoom(imgID, resultID) {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /* Create lens: */
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /* Insert lens: */
    img.parentElement.insertBefore(lens, img);
    /* Calculate the ratio between result DIV and lens: */
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /* Set background properties for the result DIV */
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    /* Execute a function when someone moves the cursor over the image, or the lens: */
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /* And also for touch screens: */
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    function moveLens(e) {
      var pos, x, y;
      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();
      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);
      /* Calculate the position of the lens: */
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      /* Prevent the lens from being positioned outside the image: */
      if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
      if (x < 0) {x = 0;}
      if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}/*98+63

      if (y < 0) {y = 0;}
      /* Set the position of the lens: */
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /* Display what the lens "sees": */
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
}

// function checked(element) {
//     return element.checked
// }

// function isOneAtLeastChecked(array) {
//     newArray = array.filter(checked)
//     if (newArray.length == 0)
//         return false
//     return true
// }


