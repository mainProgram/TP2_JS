//--------------------------------------------------------------------------------------------------DECLARATIONS
const ZOOM_RESULT = document.querySelector(".img-zoom-result")
const SLIDES = document.querySelector(".slides")    
const LEFT_ARROW = document.querySelector("#left")        
const RIGHT_ARROW = document.querySelector("#right")      
const NUMBER_OF_PICTURES = 11                                   

//--------------------------------------------------------------------------------------------------HTML STRUCTURATION
//INPUTS RADIO
for (let i = 1; i <= NUMBER_OF_PICTURES; i++) {
    input = document.createElement("input")
    input.setAttribute("type", "radio")
    input.setAttribute("name", "radio")
    input.setAttribute("id", "radio"+i)
    if(i==1) //CHECK THE FIRST IMG 
        input.setAttribute("checked", true)

    SLIDES.appendChild(input)
}

//IMAGES
for (let i = 1; i <= NUMBER_OF_PICTURES; i++) {
    div = document.createElement("div")
    div.classList.add("slide")
    if(i==1)
        div.classList.add("first")

    img = document.createElement("img")
    img.setAttribute("src", "img/img"+i+".jpg")
    img.setAttribute("alt", "flowers")
    img.setAttribute("id", "img"+i)

    div.appendChild(img)
    SLIDES.appendChild(div)
}

//DIV AUTO
const NAVIGATION_AUTO = document.createElement("div")
NAVIGATION_AUTO.setAttribute("class", "navigation-auto")
for (let i = 1; i <= NUMBER_OF_PICTURES; i++) {
    div = document.createElement("div")
    div.classList.add("auto"+i)

    NAVIGATION_AUTO.appendChild(div)
    SLIDES.appendChild(NAVIGATION_AUTO)
}  


//DIV MANUAL
const NAVIGATION_MANUAL = document.createElement("div")
NAVIGATION_MANUAL.setAttribute("class", "navigation-manual")
for (let i = 1; i <= NUMBER_OF_PICTURES; i++) {
    label = document.createElement("label")
    label.classList.add("manual")
    label.setAttribute("for", "radio"+i)

    NAVIGATION_MANUAL.appendChild(label)
    SLIDES.appendChild(NAVIGATION_MANUAL)
}  

//--------------------------------------------------------------------------------------------------EVENTS
//EVERY 5 SECONDS SHOW AN IMG
var compteur = 1;
setInterval(function(){
    document.getElementById("radio" + compteur).checked = true;
    
    compteur++;

    if(compteur > NUMBER_OF_PICTURES){
        compteur = 1
        RIGHT_ARROW.style.display = "none"
    }
    else if(compteur - 1  == 1){
        LEFT_ARROW.style.display = "none"
        RIGHT_ARROW.style.display = "block"
    }
    else{
        LEFT_ARROW.style.display = "block"
        RIGHT_ARROW.style.display = "block"
    }
      
}, 3000);

//EVERY 5 SECONDS ZOOM FOR ALL IMAGES
const ALL_IMAGES = SLIDES.querySelectorAll("img");
ALL_IMAGES.forEach((image, i) => image.addEventListener("mousemove", () => {
        ZOOM_RESULT.style.display = "block";
        imageZoom("img"+(i+1), "myresult");
    })
)

//REMOVE THE ZOOM RESULT
window.addEventListener("mouseover", (e)=>{
    if(e.target == document.body)
        ZOOM_RESULT.style.display = "none"
    else
        return false;
    console.log(e.target)
})

//WHEN I CLICK ON A RADIO STAY THERE N UPDATE COMPTEUR
const LABELS = document.querySelectorAll("label")
LABELS.forEach((label, i) => label.addEventListener("click", () => {
        document.getElementById("radio"+(i+1)).checked = true;
        compteur = i + 1
        // console.dir(label.control.checked)
    })
)

var id = 0
// WHEN I CLICK ON THE RIGHT_ARROW BUTTON
RIGHT_ARROW.addEventListener("click", ()=>{
    LABELS.forEach((label, i) => {
        if(label.control.checked == true){
            id = i+2
            return false
        }
    })
    suivant = document.getElementById("radio"+id)
    suivant.checked = true
    compteur = id
})

// WHEN I CLICK ON THE LEFT_ARROW BUTTON
LEFT_ARROW.addEventListener("click", ()=>{
    LABELS.forEach((label, i) => {
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
//     if (newArray.NUMBER_OF_PICTURES == 0)
//         return false
//     return true
// }


