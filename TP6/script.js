const MAIN = document.querySelector("main")
const SEARCH = document.querySelector("input[type='search']")
const ALL_RECIPE = document.querySelector(".allRecipe")
const API_URL = "https://www.themealdb.com/api/json/v1/1/random.php"
const API_FILTER_BY_ID = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
const API_FILTER_BY_NAME = "https://www.themealdb.com/api/json/v1/1/search.php?s="


function appendRecipe(url, generate){
    fetch(url).then(response => response.json().then(datas => {
        if(datas.meals !== null)
            for (let data of datas.meals) 
            {
                section = document.createElement("section")
                section.setAttribute("class", "recipe")

                divContent = document.createElement("div")
                divContent.setAttribute("class", "content")
                img = document.createElement("img")
                img.setAttribute("src", data.strMealThumb)
                
                if(generate == "active" && document.querySelectorAll(".recipe").length == 0){
                    button = document.createElement("button")
                    button.setAttribute("class", "generate")
                    button.innerHTML = "Générer une Recette"

                    button.addEventListener("click", ()=>{
                        ALL_RECIPE.innerHTML = ""
                        appendRecipe(API_URL)
                    })  
                }

                divTitle = document.createElement("div")
                divTitle.setAttribute("class", "title")
                h2 = document.createElement("h2")
                h2.innerHTML = data.strMeal
                i = document.createElement("i")
                i.setAttribute("class", "fas fa-heart")
                divTitle.appendChild(h2)
                divTitle.appendChild(i)

                divInfos = document.createElement("div")
                divInfos.setAttribute("class", "infos")
                divTitle2 = document.createElement("div")
                divTitle2.setAttribute("class", "title2")
                h1 = document.createElement("h1")
                h1.innerHTML = data.strMeal
                i2 = document.createElement("i")
                i2.setAttribute("class", "fa fa-close")
                divTitle2.appendChild(h1)
                divTitle2.appendChild(i2)

                img2 = document.createElement("img")
                img2.setAttribute("src", data.strMealThumb)
                p = document.createElement("p")
                p.innerHTML = data.strInstructions
                h22 = document.createElement("h2")
                h22.innerHTML = "Ingrédients:"
                ul = document.createElement("ul")
                for (let i = 1; i <= 20; i++) {
                    if(data[`strIngredient${i}`] === undefined)
                        return false;
                    if((data[`strIngredient${i}`]) != ""){
                        li = document.createElement("li")
                        li.innerHTML = data[`strIngredient${i}`] + " - " + data[`strMeasure${i}`]
                        ul.appendChild(li)
                    }
                }   

                divInfos.appendChild(divTitle2)
                divInfos.appendChild(img2)
                divInfos.appendChild(p)
                divInfos.appendChild(h22)
                divInfos.appendChild(ul)

                divContent.appendChild(img)
                if(generate == "active")
                    divContent.appendChild(button)
                divContent.appendChild(divTitle)
                divContent.appendChild(divInfos)

                section.appendChild(divContent)

                ALL_RECIPE.appendChild(section)

                MAIN.appendChild(ALL_RECIPE)
                
                const HEART = document.querySelector(".fa-heart")

                HEART.addEventListener("click", () => {
                    divInfos.style.display = "block"
                })

                i2.addEventListener("click", () => {
                    divInfos.style.display = "none"
                })
            }
        else
            alert("Pas trouvé")
    }))
}

appendRecipe(API_URL, "active")

SEARCH.addEventListener("input", () => {

    if(SEARCH.value != ""){
        if(isNaN(SEARCH.value)){    //strings
            fetch(API_FILTER_BY_NAME + SEARCH.value).then(response => response.json().then(data => {
                ALL_RECIPE.innerHTML = ""
                appendRecipe(API_FILTER_BY_NAME + SEARCH.value, "unactive")
            }))
        }
        else{                       //numbers
            fetch(API_FILTER_BY_ID + SEARCH.value).then(response => response.json().then(data => {
                ALL_RECIPE.innerHTML = ""
                appendRecipe(API_FILTER_BY_ID + SEARCH.value, "unactive")
            }))
        }
    }
    else{
        ALL_RECIPE.innerHTML = ""
        appendRecipe(API_URL, "active")
    }
    
})