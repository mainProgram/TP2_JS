function createColumn(){
    const ALL_TASK_COLUMNS = document.querySelectorAll(".task-column")
    if(ALL_TASK_COLUMNS.length < 5){  // Création des colonnes

        divTaskColumn = document.createElement("div")
        divTaskColumn.setAttribute("class", "task-column")
        divTaskColumn.setAttribute("id", (ALL_TASK_COLUMNS.length+1))

        divHead = document.createElement("div")
        divHead.setAttribute("class", "head")
        input = document.createElement("input")
        input.value = "Column " + (ALL_TASK_COLUMNS.length + 1)
        divHead.appendChild(input)

        divBody = document.createElement("div")
        divBody.setAttribute("class", "body")
        
        divFooter = document.createElement("div")
        divFooter.setAttribute("class", "footer")
        span = document.createElement("span")
        span.setAttribute("class", "material-icons md-24 delete")
        span.innerText = "delete"
        divFooter.appendChild(span)

        divTaskColumn.appendChild(divHead)
        divTaskColumn.appendChild(divBody)
        divTaskColumn.appendChild(divFooter)

        SECTION.appendChild(divTaskColumn)
    }
    else{
        MODAL.classList.add("show-modal")
        MODAL.querySelector(".modal").style.visibility = "hidden"
        MODAL.querySelector(".alert").style.visibility = "visible"
        ALERT.querySelector(".text-alert").innerHTML = "MAXIMUM REACHED !"
    }

    // Lors de la modification le titre de la colonne ne doit pas etre vide
        columnTitleNotEmpty()

    //On ne peut supprimer la première colonne que si elle est la seule
        hideOrShowColumn1IconTrash()
        
    const DELETE_ICON = document.querySelectorAll(".delete")
    DELETE_ICON.forEach(icon => icon.addEventListener("click", () => {
        icon.parentElement.parentElement.style.animation = "disappear 1s";
        setTimeout(() => { icon.parentElement.parentElement.remove() }, 1000)

        //Remise a jour des id et titre des colonnes apres suppression dune colonne
        refreshColumnIdAndTitle()

        //On ne peut supprimer la première colonne que si elle est la seule
        setTimeout(() => { hideOrShowColumn1IconTrash() }, 1000)    
    }))
}

let i = 0
function createTask(){
    const ALL_TASK_COLUMNS = document.querySelectorAll(".task-column")

    div = document.createElement("div")
    div.setAttribute("class", "task")
    div.setAttribute("id", "task_"+ (++i))
    div.setAttribute("ondblclick", "edit(this)")
    divDescription = document.createElement("div")
    divDescription.setAttribute("class", "description")
    
    span1 = document.createElement("span")
    span1.setAttribute("class", "material-icons md-24 left")
    span1.innerText = "keyboard_double_arrow_left"
    span1.addEventListener("click", (e)  => { // Déplacement a gauche
        id = e.target.parentElement.parentElement.parentElement.parentElement.id
        if(id > 1){
            targetID = Number(id) - 1
            document.getElementById(targetID).querySelector(".body").appendChild(e.target.parentElement.parentElement)
        }
    })

    span2 = document.createElement("span")    
    if(upcomingOrOverOrOngoing(TASK_DATE.value + " " + TASK_START_TIME.value) == "upcoming"){
        span2.innerHTML = "<span class='material-icons md-12 state-icon'>upcoming</span>"
        span2.innerHTML += "<span class='state-text'>upcoming</span></br>"        
        divDescription.classList.add("upcoming")
    }
    else if (upcomingOrOverOrOngoing(TASK_DATE.value + " " + TASK_START_TIME.value) == "ongoing"){
        span2.innerHTML = "<span class='material-icons md-12 state-icon'>autorenew</span>"
        span2.innerHTML += "<span class='state-text'>on going </span></br>"        
        divDescription.classList.add("ongoing")   
    }
    else{        
        span2.innerHTML = "<span class='material-icons md-12 state-icon'>task_alt</span>"
        span2.innerHTML += "<span class='state-text'>over</span></br>"  
        divDescription.classList.add("over")
    }   
    span2.innerHTML += "<span>" + TASK_DESCRIPTION.value + "</span>"
    span2.innerHTML += '<span class="material-icons delete-task">delete</span>'   
    span2.innerHTML += `<span class="column-id">${ALL_TASK_COLUMNS.length}</span>`
    span2.innerHTML += '<span class="material-icons restore">restore</span>'
    span2.addEventListener("mouseover", (e) => { // Affichage des infos au survol
        if(e.target.parentElement.parentElement.querySelector(".infos") === null)
            e.target.parentElement.parentElement.parentElement.querySelector(".infos").style.display = "flex"
        else
            e.target.parentElement.parentElement.querySelector(".infos").style.display = "flex"
    })
    span2.addEventListener("mouseout", (e) => {
        if(e.target.parentElement.parentElement.querySelector(".infos") === null)
            e.target.parentElement.parentElement.parentElement.querySelector(".infos").style.display = "none"
        else
            e.target.parentElement.parentElement.querySelector(".infos").style.display = "none"
    })

    span3 = document.createElement("span")
    span3.setAttribute("class", "material-icons md-24 right")
    span3.innerText = "keyboard_double_arrow_right"
    span3.addEventListener("click", (e)  => { // Déplacement a droite
        id = e.target.parentElement.parentElement.parentElement.parentElement.id
        if(id < 5){
            targetID = Number(id) + 1
            document.getElementById(targetID).querySelector(".body").appendChild(e.target.parentElement.parentElement)
        }
    })

    divDescription.appendChild(span1)
    divDescription.appendChild(span2)
    divDescription.appendChild(span3)

    divInfos = document.createElement("div")
    divInfos.setAttribute("class", "infos")

    p1 = document.createElement("p")
    hours = document.createElement("span")
    minutes = document.createElement("span")
    seconds = document.createElement("span")
    secondes = diffSeconds(TASK_START_TIME.value, TASK_ENDING_TIME.value)
    taskCountdown(secondes, hours, minutes, seconds)
    if(Number(hours.innerHTML ) < 10)  hours.innerHTML = "0" + hours.innerHTML
    if(Number(minutes.innerHTML ) < 10)  minutes.innerHTML = "0" + minutes.innerHTML
    p1.innerHTML = "Duration " + hours.innerHTML + ":" + minutes.innerHTML + ":0" + seconds.innerHTML  

    p2 = document.createElement("p")
    span1p2 = document.createElement("span")
    span1p2.innerText = "Date: "
    span2p2 = document.createElement("span")
    span2p2.innerText = TASK_DATE.value
    p2.appendChild(span1p2)
    p2.appendChild(span2p2)
              
    p3 = document.createElement("p")
    span1p3 = document.createElement("span")
    span1p3.innerText = "Start-Time: "
    span2p3 = document.createElement("span")
    span2p3.innerText = TASK_START_TIME.value
    p3.appendChild(span1p3)
    p3.appendChild(span2p3)

    p4 = document.createElement("p")
    span1p4 = document.createElement("span")
    span1p4.innerText = "Ending-Time: "
    span2p4 = document.createElement("span")
    span2p4.innerText = TASK_ENDING_TIME.value
    p4.appendChild(span1p4)
    p4.appendChild(span2p4)
    
    divInfos.appendChild(p1)
    divInfos.appendChild(p3)
    divInfos.appendChild(p4)
    divInfos.appendChild(p2)

    div.appendChild(divDescription)
    div.appendChild(divInfos)

    document.getElementById("1").querySelector(".body").appendChild(div)

    //  AJOUTER DANS LA CORBEILLE
    add_in_the_trash()

    // RESTAURER LES TACHES
    restoreTask()
    
}

function isEmpty(value){
    if((value.trim() == ""))
        TASK_DESCRIPTION.classList.add("red")
    else
        TASK_DESCRIPTION.classList.remove("red")
    return (value.trim() != "")
}

function isDateValid(date){
    actualDate = new Date;
    actualDate = actualDate.getFullYear() + "-" + (actualDate.getMonth() + 1) + "-" + actualDate.getDate()
    dateNew = new Date(actualDate)

    if(date - dateNew < 0)
        TASK_DATE.classList.add("red")
    else
        TASK_DATE.classList.remove("red")
    return(date - dateNew >= 0)
}

// FOURNIT LE TOTAL DE SECONDES D'UNE HEURE ex: 12:23
function getSeconds(time){
    time = time.split(":")
    heureUser = Number(time[0]) * 3600
    minuteUser = Number(time[1]) * 60
    tempsUser = heureUser + minuteUser
    return tempsUser
}

// FOURNIT LA DIFFERENCE DE DEUX TEMPS EN SECONDES
function diffSeconds(startTime, endingTime){
    startTime = getSeconds(startTime)
    endingTime = getSeconds(endingTime)
    return endingTime - startTime
}

//Vérifie si l'heure de début d'une tâche est correcte
function isStartTimeCorrect(startTime){
    dateUser = new Date
    tempsActuel =  (dateUser.getHours() * 3600) + (dateUser.getMinutes() * 60)

    tempsUser = getSeconds(startTime)

    if(tempsUser < tempsActuel)
        TASK_START_TIME.classList.add("red")
    else
        TASK_START_TIME.classList.remove("red")
    return (tempsUser >= tempsActuel)
}

//Vérifie si l'heure de fin d'une tâche est correcte
function isEndingTimeCorrect(startTime, endingTime){
    startTime = getSeconds(startTime)
    endingTime = getSeconds(endingTime)
    if( TASK_START_TIME.value != "" && endingTime <= startTime)
        TASK_ENDING_TIME.classList.add("red")
    else
        TASK_ENDING_TIME.classList.remove("red")
    return endingTime > startTime
}

// Vérifier la validité des champs du modal
function AreAllInfosCorrect(){
    dateUser = new Date(TASK_DATE.value)
    actualDate = new Date;
    actualDate = actualDate.getFullYear() + "-" + (actualDate.getMonth() + 1) + "-" + actualDate.getDate()
    dateNew = new Date(actualDate)

    if(dateUser - dateNew > 0){
        correctInputs = isDateValid(dateUser) + isEndingTimeCorrect(TASK_START_TIME.value, TASK_ENDING_TIME.value) + isEmpty(TASK_DESCRIPTION.value)
        if(correctInputs == 3){
            TASK_BUTTON_SUBMIT.removeAttribute("disabled")
            TASK_BUTTON_EDIT.removeAttribute("disabled")
        }
        else{
            TASK_BUTTON_EDIT.setAttribute("disabled", "disabled")
            TASK_BUTTON_SUBMIT.setAttribute("disabled", "disabled")
        }
    }
    else{
        correctInputs = isDateValid(dateUser) + isEndingTimeCorrect(TASK_START_TIME.value, TASK_ENDING_TIME.value) + isEmpty(TASK_DESCRIPTION.value) + isStartTimeCorrect(TASK_START_TIME.value)
        if(correctInputs == 4){
            TASK_BUTTON_SUBMIT.removeAttribute("disabled")
            TASK_BUTTON_EDIT.removeAttribute("disabled")
        }
        else{
            TASK_BUTTON_EDIT.setAttribute("disabled", "disabled")
            TASK_BUTTON_SUBMIT.setAttribute("disabled", "disabled")
        }
    }

}

//Vider les champs du formulaire du modal
function cleanForm(){
    TASK_INFOS.forEach(element => {
        element.value = ""
        element.classList.remove("red")
    })
}

// Vérifie si le nom de la colonne est Column 1, 2, 3, 4 ou 5
function isNameColumn(data){
    const regex = /^Column [1-5]{1}$/;
    if(regex.test(data))
        return true
    return false
}

// VERIFIE L'ETAT DES TACHES (ONGOING, OVER, UPCOMING)
function upcomingOrOverOrOngoing(data){

    actualDate = new Date;
    actualDate = actualDate.getFullYear() + "-" + (actualDate.getMonth() + 1) + "-" + actualDate.getDate() + " " + actualDate.getHours() + ":" + actualDate.getMinutes()
    dateNew = new Date(actualDate)

    dateUser = new Date(data)
    
    if(dateUser.getFullYear() == dateNew.getFullYear()  && dateUser.getMonth() == dateNew.getMonth() && dateUser.getDate() == dateNew.getDate() && dateUser.getHours() == dateNew.getHours() && dateUser.getMinutes() == dateNew.getMinutes())
        return "ongoing"

    if(dateUser.getFullYear() > dateNew.getFullYear())        
        return ("upcoming")
    else if(dateUser.getFullYear() < dateNew.getFullYear())        
        return ("over")
    else
        if(dateUser.getMonth() > dateNew.getMonth())          
            return ("upcoming")
        else if(dateUser.getMonth() < dateNew.getMonth())            
            return ("over")
        else
            if(dateUser.getDate() > dateNew.getDate())                
                return ("upcoming")
            else if(dateUser.getDate() < dateNew.getDate())                
                return ("over")
            else       
                if(dateUser.getHours() > dateNew.getHours())         
                    return ("upcoming")
                else if(dateUser.getHours() < dateNew.getHours())                
                    return ("over")
                else
                    if(dateUser.getMinutes() > dateNew.getMinutes())         
                        return ("upcoming")
                    else if(dateUser.getMinutes() < dateNew.getMinutes())                
                        return ("over")         
}

function taskCountdown(seconds, h="", m="", s=""){
    h.innerHTML = Math.floor(seconds / 3600)
    m.innerHTML = Math.floor((seconds % 3600)/60)
    s.innerHTML = Math.floor((seconds % 3600)%60) 
    return [Math.floor(seconds / 3600), Math.floor((seconds % 3600)/60), Math.floor((seconds % 3600)%60)]
}

// CHANGE L'ETAT DES TACHES (ONGOING, OVER, UPCOMING)
function checkSAtate(){
    const ALL_TASK_COLUMNS = document.querySelectorAll(".task-column")
    if(ALL_TASK_COLUMNS.length > 0)
    {
        ALL_TASK_COLUMNS.forEach(element => {
            divInfos = element.querySelectorAll(".infos")
            if(divInfos.length > 0)
            {
                divInfos.forEach(div => {
                    dateUser = div.children[3].children[1]
                    startTime  = div.children[1].children[1]
                    endingTime = div.children[2].children[1]
                    divDescription = div.previousElementSibling
                    stateIcon = divDescription.querySelector(".state-icon")
                    stateText = divDescription.querySelector(".state-text")
                    actualTime = new Date().getHours() + ":" + new Date().getMinutes()

                    const a = dateUser.innerHTML

                    if (upcomingOrOverOrOngoing(a+ " " + startTime.innerHTML) == "ongoing"){
                        stateIcon.innerHTML = "autorenew"
                        stateText.innerHTML = "on going"        
                        divDescription.setAttribute("class", "description ongoing")   
                    }

                    if(upcomingOrOverOrOngoing(a+ " " + endingTime.innerHTML) == "over" || diffSeconds(actualTime, endingTime.innerHTML ) <= 0){        
                        stateIcon.innerHTML = "task_alt"
                        stateText.innerHTML = "over"  
                        divDescription.setAttribute("class", "description over")
                        divDescription.parentElement.removeAttribute("ondblclick") //On ne peut modifier une tâche terminée
                    }  
                })
            }
        })
    }
}

function edit(parent) {
    TASK_BUTTON_SUBMIT.setAttribute("disabled", "disabled")
    MODAL.classList.add("show-modal")
    MODAL.classList.add("edit")
    MODAL.querySelector(".modal").style.visibility = "visible"
    MODAL.querySelector(".alert").style.visibility = "hidden"
    MODAL.querySelector(".keep-task-id").value = parent.id

    divDesc = parent.querySelector(".description")
    divInfo = parent.querySelector(".infos")

    TASK_DATE.value = divInfo.children[3].children[1].innerText
    TASK_START_TIME.value = divInfo.children[1].children[1].innerText
    TASK_ENDING_TIME.value = divInfo.children[2].children[1].innerText
    TASK_DESCRIPTION.value = divDesc.children[1].children[3].innerText
}

//On ne peut supprimer la première colonne que si elle est la seule
function hideOrShowColumn1IconTrash(){
    if(document.querySelectorAll(".task-column").length > 1) 
        document.getElementById("1").querySelector(".footer").querySelector("span").style.visibility = "hidden"
    else
        document.getElementById("1").querySelector(".footer").querySelector("span").style.visibility = "visible"
}

// Lors de la modification le titre de la colonne ne doit pas etre vide
function columnTitleNotEmpty(){
    const ALL_INPUTS = document.querySelectorAll("input")  
    ALL_INPUTS.forEach(input => input.addEventListener("blur", () => {
        if(input.value == "")
            input.value = "Column" + (ALL_TASK_COLUMNS.length + 1)
    }))
}

//REFRESH COLUMN ID AND TITLE
function refreshColumnIdAndTitle(){
    setTimeout(() => { 
        const ALL_TASK_COLUMNS = document.querySelectorAll(".task-column")
        ALL_TASK_COLUMNS.forEach((input, i) => {
            input.id = (i+1)
            if(isNameColumn(input.querySelector(".head").querySelector("input").value))
                input.querySelector(".head").querySelector("input").value = "Column " + (i+1)
        })
    }, 1000)
}

//PUT TASKS IN THE TRASH
function add_in_the_trash(){
    const DELETE_TASK_ICON = document.querySelectorAll(".delete-task")
    DELETE_TASK_ICON.forEach(el => {
        el.addEventListener("click", (e) => {
            TRASH_BODY.querySelector(".body").appendChild(e.target.parentElement.parentElement.parentElement)
            TRASH_BODY.classList.add("show-modal")
        })
    })
}

//RESTAURER LES TÂCHES
function restoreTask(){
    const RESTORE_ICON = document.querySelectorAll(".restore")
    RESTORE_ICON.forEach(el => {
        el.addEventListener("click", (e) => {
            parentID = e.target.previousElementSibling.innerHTML
            if(document.getElementById(parentID) !== null){
                document.getElementById(parentID).querySelector(".body").appendChild(e.target.parentElement.parentElement.parentElement)
                e.target.parentElement.parentElement.parentElement.classList.remove("do-not-show-right-and-left-icon")
            }
            else{
                if(document.getElementById("1") !== null)
                {
                    document.getElementById("1").querySelector(".body").appendChild(e.target.parentElement.parentElement.parentElement)
                    e.target.parentElement.parentElement.parentElement.classList.remove("do-not-show-right-and-left-icon")
                }
                else{
                    MODAL.classList.add("show-modal")
                    MODAL.querySelector(".modal").style.visibility = "hidden"
                    MODAL.querySelector(".alert").style.visibility = "visible"
                    ALERT.querySelector(".text-alert").innerHTML = "IL N'Y A PAS DE COLONNES !"
                }        
            }
        })
    })
}