// ------------------------------------------------------------------------------------DECLARATIONS
const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const MAIN = document.querySelector("main")
const LOADER = document.querySelector(".loader")
const SEARCH = document.querySelector("input[type='search']")
const TOP_ARROW = document.querySelector("a[href='#header']")

// ------------------------------------------------------------------------------------BODY
addFilms(API_URL + 1)

// ------------------------------------------------------------------------------------FUNCTIONS
function notFound(){
    MAIN.innerHTML = ""
    h1 = document.createElement("h1")
    h1.innerHTML = "Not found !"
    h1.setAttribute("class", "red")
    MAIN.appendChild(h1)
}

function addFilms(data){
    fetch(data).then(response => 
        response.json().then(data => {
            for (let film of data.results) {
                    
                original_title = film.original_title
                vote_average = film.vote_average
                poster_path = film.poster_path
                overview = film.overview
        
                section = document.createElement("section")
                section.setAttribute("class", "film")
        
                img = document.createElement("img")
                img.setAttribute("src", IMG_PATH + poster_path)
        
                div = document.createElement("div")
                div.setAttribute("class", "film-details")
                h4 = document.createElement("h4")
                h4.innerHTML = original_title
                span = document.createElement("span")
                span.innerHTML = vote_average
                if(vote_average < 5)
                    span.setAttribute("class", "red")
                else if(vote_average >= 5 && vote_average < 8)
                    span.setAttribute("class", "orange")
                else
                    span.setAttribute("class", "green")
                div.appendChild(h4)
                div.appendChild(span)
        
                divOverview = document.createElement("div")
                divOverview.setAttribute("class", "overview")
                h3 = document.createElement("h3")
                h3.innerHTML = original_title
                p = document.createElement("p")
                p.innerHTML = overview
                divOverview.appendChild(h3)
                divOverview.appendChild(p)
        
                section.appendChild(img)
                section.appendChild(div)
                section.appendChild(divOverview)
        
                MAIN.appendChild(section)
            }
        })
    )
}

const scroll = function scroll(){
    const { 
        scrollTop, 
        scrollHeight, 
        clientHeight 
    } = document.documentElement

    if(scrollTop + clientHeight >= scrollHeight - 5)  {  
        page++
        LOADER.classList.add("show")
        setTimeout(function(){
            addFilms(API_URL + page)
        }, 2000)
    }

    console.log(scrollTop + clientHeight)
    if(scrollTop + clientHeight > 10000)
        TOP_ARROW.firstChild.classList.add("show")
    else
        TOP_ARROW.firstChild.classList.remove("show")

}
// ------------------------------------------------------------------------------------EVENTS
let page = 1
window.addEventListener("scroll", scroll)

SEARCH.addEventListener("input", () => {

    if(SEARCH.value.length != "" && SEARCH.value.length > 2 ){
        fetch(SEARCH_API + SEARCH.value).then(response => response.json().then(data => {
            if(data.results.length > 0){
                MAIN.innerHTML = ""
                addFilms(SEARCH_API + SEARCH.value)
                window.removeEventListener("scroll", scroll)
                LOADER.classList.remove("show")
            }       
            else
                notFound()
        }))
    }
    else{
        MAIN.innerHTML = ""
        addFilms(API_URL+1)
        page = 1
        window.addEventListener("scroll", scroll)
    }
})


