//--------------------------------------------------------------------------------------------------DECLARATIONS
const Allimg = document.querySelectorAll("img")
const header = document.querySelector(".header")
const sidebar = document.querySelector(".sidebar")
const wrapper = document.querySelector(".wrapper")
const sidebarBtn = document.querySelector(".sidebar-btn")
const sidebarMenu = document.querySelector(".sidebar-menu")
const AllSubMenu = document.querySelectorAll(".sub-menu")
const mainContainer = document.querySelector(".main-container")

const tabObjets = [
    {
        id: "",
        class: "item",
        a: {
            "href": "#",
            "class": "menu-btn",
        },
        firstIcon : "fas fa-search",
        span: "<input type='text'>",
        small:{
            "text": "",
            "class": ""
        },
        secondIcon: "",
        div:{
            "class": "",
            "a": "#",
            "i": "",
            "span": ""
        }
    },
    {
        id: "dashboard",
        class: "item",
        a: {
            "href": "#dashboard",
            "class": "menu-btn",
        },
        firstIcon : "fas fa-tachometer-alt",
        span: "Dashboard",
        small:{
            "text": "",
            "class": ""
        },
        secondIcon: "fas fa-angle-left",
        div:{
            "class": "sub-menu",
            "a": "#",
            "i": "far fa-circle",
            "span": "text"
        }
    },
    {
        id: "widgets",
        class: "item",
        a: {
            "href": "#widgets",
            "class": "menu-btn",
        },
        firstIcon : "fas fa-th",
        span: "Widgets",
        small:{
            "text": "New",
            "class": "red"
        },
        secondIcon: "",
        div:{
            "class": "",
            "a": "",
            "i": "",
            "span": ""
        }
    },
    {
        id: "layout",
        class: "item",
        a: {
            "href": "#layout",
            "class": "menu-btn",
        },
        firstIcon : "far fa-copy",
        span: "Layout Options",
        small:{
            "text": "6",
            "class": "blue"
        },
        secondIcon: "fas fa-angle-left",
        div:{
            "class": "sub-menu",
            "a": "#",
            "i": "far fa-circle",
            "span": "text"
        }
    },
    {
        id: "charts",
        class: "item",
        a: {
            "href": "#charts",
            "class": "menu-btn",
        },
        firstIcon : "fas fa-chart-pie",
        span: "Charts",
        small:{
            "text": "",
            "class": ""
        },
        secondIcon: "fas fa-angle-left",
        div:{
            "class": "sub-menu",
            "a": "#",
            "i": "far fa-circle",
            "span": "text"
        }
    },
    {
        id: "ui",
        class: "item",
        a: {
            "href": "#ui",
            "class": "menu-btn",
        },
        firstIcon : "fas fa-tree",
        span: "UI Elements",
        small:{
            "text": "",
            "class": ""
        },
        secondIcon: "fas fa-angle-left",
        div:{
            "class": "sub-menu",
            "a": "#",
            "i": "far fa-circle",
            "span": "text"
        }
    },
    {
        id: "forms",
        class: "item",
        a: {
            "href": "#forms",
            "class": "menu-btn",
        },
        firstIcon : "fas fa-edit",
        span: "Forms",
        small:{
            "text": "",
            "class": ""
        },
        secondIcon: "fas fa-angle-left",
        div:{
            "class": "sub-menu",
            "a": "#",
            "i": "far fa-circle",
            "span": "text"
        }
    },
    {
        id: "tables",
        class: "item",
        a: {
            "href": "#tables",
            "class": "menu-btn",
        },
        firstIcon : "fas fa-border-all",
        span: "Tables",
        small:{
            "text": "",
            "class": ""
        },
        secondIcon: "fas fa-angle-left",
        div:{
            "class": "sub-menu",
            "a": "#",
            "i": "far fa-circle",
            "span": "text"
        }
    },
    {
        id: "elements",
        class: "item",
        a: {
            "href": "#elements",
            "class": "menu-btn",
        },
        firstIcon : "",
        span: "Elements",
        small:{
            "text": "",
            "class": ""
        },
        secondIcon: "",
        div:{
            "class": "",
            "a": "",
            "i": "",
            "span": ""
        }
    }
]
//--------------------------------------------------------------------------------------------------HTML STRUCTURATION
tabObjets.forEach(element => {
    li = document.createElement("li")
    li.setAttribute("class", element.class)
    li.setAttribute("id", element.id)

    a = document.createElement("a")
    a.setAttribute("href", element.a.href)
    a.setAttribute("class", element.a.class)

    i1 = document.createElement("i")
    i1.setAttribute("class", element.firstIcon)

    span = document.createElement("span")
    span.innerHTML =  element.span

    small = document.createElement("small")
    small.innerHTML = element.small.text
    small.setAttribute("class", element.small.class)

    i2 = document.createElement("i")
    i2.setAttribute("class", element.secondIcon)

    a.appendChild(i1)
    span.appendChild(small)
    span.appendChild(i2)
    a.appendChild(span)

    var div = document.createElement("div")
    div.setAttribute("class", element.div.class)

    for (let i = 0; i < 3; i++) {

        a3 = document.createElement("a")
        a3.setAttribute("href", element.div.a)

        i3 = document.createElement("i")
        i3.setAttribute("class", element.div.i)

        span3 = document.createElement("span")
        span3.innerHTML =  element.div.span  

        a3.appendChild(i3)
        a3.appendChild(span3)
        div.appendChild(a3)
    } 

    li.appendChild(a)
    li.appendChild(div)

    sidebarMenu.appendChild(li)
});


//--------------------------------------------------------------------------------------------------FUNCTIONS


//--------------------------------------------------------------------------------------------------EVENTS
// LES FLECHES
const drop_down_arrows = document.querySelectorAll(".fa-angle-left")
drop_down_arrows.forEach((element) => element.addEventListener("click", ()=>{
    element.classList.toggle("left")
}))



// LE BOUTON BURGER
sidebarBtn.addEventListener("click", ()=>{
    wrapper.classList.toggle("collapse")
})


const AllMenuBtn = document.querySelectorAll(".menu-btn")
// HOVER SUR LES ICONES DU SIDEBAR
AllMenuBtn.forEach((element) => element.addEventListener("mouseover", ()=>{
        wrapper.classList.remove("collapse")
    })
)

// HOVER SUR LES ICONES DU SUB MENU
AllSubMenu.forEach((element) => element.addEventListener("mouseover", ()=>{
    wrapper.classList.remove("collapse")
})
)

// HOVER SUR LES IMG DU SIDEBAR
Allimg.forEach((element) => element.addEventListener("mouseover", ()=>{
    wrapper.classList.remove("collapse")
})
)

// COLLAPSE WHEN NOT HOVERING THE MENU
window.addEventListener('mouseover', function(e)
{ 
    if(e.target == mainContainer)
        wrapper.classList.add("collapse")
    else
        return false;
});
