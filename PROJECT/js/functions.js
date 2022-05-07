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
        appendElements(divTaskColumn, [divHead, divBody, divFooter])
        SECTION.appendChild(divTaskColumn)
    }
    else{
        MODAL.classList.add("show-modal")
        MODAL.querySelector(".modal").style.visibility = "hidden"
        MODAL.querySelector(".alert").style.visibility = "visible"
        ALERT.querySelector(".text-alert").innerHTML = "MAXIMUM REACHED !"
    }
    document.querySelectorAll("input").forEach(input => input.addEventListener("blur", () => { // Lors de la modification le titre de la colonne ne doit pas etre vide
        if(input.value.trim() == "")
            input.value = "Column" + (ALL_TASK_COLUMNS.length + 1)
    }))
    hideOrShowColumn1IconTrash() //On ne peut supprimer la première colonne que si elle est la seule
    const DELETE_ICON = document.querySelectorAll(".delete")  // SUPPRESSION DES COLONNES
    DELETE_ICON.forEach(icon => icon.addEventListener("click", () => {
        icon.parentElement.parentElement.style.animation = "disappear 1s";
        setTimeout(() => { icon.parentElement.parentElement.remove() }, 1000)
        //Remise a jour des id et titre des colonnes apres suppression dune colonne
        refreshColumnIdAndTitle()
        //On ne peut supprimer la première colonne que si elle est la seule
        setTimeout(() => { hideOrShowColumn1IconTrash() }, 1000)    
    }))
}
function createTask(TASK_DESC, TASK_DATE, TASK_START_TIME, TASK_ENDING_TIME, id){
    const ALL_TASK_COLUMNS = document.querySelectorAll(".task-column")
    div = document.createElement("div")
    div.setAttribute("class", "task")
    div.setAttribute("id", id)
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
                    updateTaskOriginID()
                }
            })
            span2 = document.createElement("span")    
            if(upcomingOrOverOrOngoing(TASK_DATE + " " + TASK_START_TIME) == "upcoming"){
                span2.innerHTML = "<span class='material-icons md-12 state-icon'>upcoming</span>"
                span2.innerHTML += "<span class='state-text'>upcoming</span></br>"        
                divDescription.classList.add("upcoming")
            }
            else if (upcomingOrOverOrOngoing(TASK_DATE + " " + TASK_START_TIME ) == "ongoing"){
                span2.innerHTML = "<span class='material-icons md-12 state-icon'>autorenew</span>"
                span2.innerHTML += "<span class='state-text'>on going </span></br>"        
                divDescription.classList.add("ongoing")   
            }
            else{
                span2.innerHTML = "<span class='material-icons md-12 state-icon'>task_alt</span>"
                span2.innerHTML += "<span class='state-text'>over</span></br>"        
                divDescription.classList.add("over")   
            }
            span2.innerHTML += "<span>" + TASK_DESC + "</span>"
            span2.innerHTML += '<span class="material-icons delete-task">delete</span>'   
            span2.innerHTML += '<span class="column-id">1</span>'
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
                    updateTaskOriginID()
                }
            })
        appendElements(divDescription, [span1, span2, span3]);
    divInfos = document.createElement("div")
    divInfos.setAttribute("class", "infos")
        p1 = document.createElement("p")
        secondes = diffSeconds(TASK_START_TIME, TASK_ENDING_TIME)
        hms = taskCountdown(secondes)
        p1 = createPWith2Spans("Duration: ", hms[0] + ":" +  hms[1] + ":" +  hms[2])  
        p2 = createPWith2Spans("Date: ", TASK_DATE)
        p3 = createPWith2Spans("Start-Time: ", TASK_START_TIME)
        p4 = createPWith2Spans("Ending-Time: ", TASK_ENDING_TIME)
    appendElements(divInfos, [p1, p3, p4, p2]);
    appendElements(div, [divDescription, divInfos]);
    document.getElementById("1").querySelector(".body").appendChild(div)  

    add_in_the_trash() //  AJOUTER DANS LA CORBEILLE
   
    restoreTask()   // RESTAURER LES TACHES
}
function isEmpty(value){
    value.trim() == "" ? TASK_DESCRIPTION.classList.add("red") : TASK_DESCRIPTION.classList.remove("red");
    return (value.trim() != "")
}
function isDateValid(date){
    actualDate = new Date;
    actualDate = actualDate.getFullYear() + "-" + (actualDate.getMonth() + 1) + "-" + actualDate.getDate()
    dateNew = new Date(actualDate)
    date - dateNew < 0 ? TASK_DATE.classList.add("red") :  TASK_DATE.classList.remove("red"); 
    return(date - dateNew >= 0)
}
function getSeconds(time){ // FOURNIT LE TOTAL DE SECONDES D'UNE HEURE ex: 12:23
    time = time.split(":")
    heureUser = Number(time[0]) * 3600
    minuteUser = Number(time[1]) * 60
    tempsUser = heureUser + minuteUser
    return tempsUser
}
function diffSeconds(startTime, endingTime){ // FOURNIT LA DIFFERENCE DE DEUX TEMPS EN SECONDES
    return getSeconds(endingTime) - getSeconds(startTime)
}
function isStartTimeCorrect(startTime){ //Vérifie si l'heure de début d'une tâche est correcte
    dateUser = new Date
    tempsActuel =  (dateUser.getHours() * 3600) + (dateUser.getMinutes() * 60)
    tempsUser = getSeconds(startTime)
    tempsUser < tempsActuel ? TASK_START_TIME.classList.add("red") : TASK_START_TIME.classList.remove("red")
    return (tempsUser >= tempsActuel)
}
function isEndingTimeCorrect(startTime, endingTime){ //Vérifie si l'heure de fin d'une tâche est correcte
    startTime = getSeconds(startTime)
    endingTime = getSeconds(endingTime)
    TASK_START_TIME.value != "" && endingTime <= startTime ? TASK_ENDING_TIME.classList.add("red") : TASK_ENDING_TIME.classList.remove("red")
    return endingTime > startTime
}
function AreAllInfosCorrect(){ // Vérifier la validité des champs du modal
    dateUser = new Date(TASK_DATE.value)
    actualDate = new Date;
    actualDate = actualDate.getFullYear() + "-" + (actualDate.getMonth() + 1) + "-" + actualDate.getDate()
    dateNew = new Date(actualDate)
    if(dateUser - dateNew > 0){
        TASK_INFOS.forEach(element => { element.classList.remove("red") })
        correctInputs = isDateValid(dateUser) + isEndingTimeCorrect(TASK_START_TIME.value, TASK_ENDING_TIME.value) + isEmpty(TASK_DESCRIPTION.value)
        if(correctInputs == 3){
            TASK_BUTTON_SUBMIT.removeAttribute("disabled"); TASK_BUTTON_EDIT.removeAttribute("disabled");
        }
        else{
            TASK_BUTTON_EDIT.setAttribute("disabled", "disabled") ; TASK_BUTTON_SUBMIT.setAttribute("disabled", "disabled");
        }
    }
    else{
        correctInputs = isDateValid(dateUser) + isEndingTimeCorrect(TASK_START_TIME.value, TASK_ENDING_TIME.value) + isEmpty(TASK_DESCRIPTION.value) + isStartTimeCorrect(TASK_START_TIME.value)
        if(correctInputs == 4){
            TASK_BUTTON_SUBMIT.removeAttribute("disabled") ; TASK_BUTTON_EDIT.removeAttribute("disabled");
        }
        else{
            TASK_BUTTON_EDIT.setAttribute("disabled", "disabled"); TASK_BUTTON_SUBMIT.setAttribute("disabled", "disabled");
        }
    }
}
function cleanForm(){ //Vider les champs du formulaire du modal
    TASK_INFOS.forEach(element => { element.value = ""; element.classList.remove("red"); })
}
function isNameColumn(data){ // Vérifie si le nom de la colonne est Column 1, 2, 3, 4 ou 5
    const regex = /^Column [1-5]{1}$/;
    return (regex.test(data));
}
function upcomingOrOverOrOngoing(data){ // VERIFIE L'ETAT DES TACHES (ONGOING, OVER, UPCOMING)
    actualDate = new Date;
    actualDate = actualDate.getFullYear() + "-" + (actualDate.getMonth() + 1) + "-" + actualDate.getDate() + " " + actualDate.getHours() + ":" + actualDate.getMinutes()
    dateNew = new Date(actualDate)
    dateUser = new Date(data)

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
                    else
                        return ("ongoing")
}
function taskCountdown(seconds){ //Fournit hh:mm:ss
    h = Math.floor(seconds / 3600)
    m = Math.floor((seconds % 3600)/60)
    s = Math.floor((seconds % 3600)%60) 
    if(h < 10) h = "0"+h
    if(m < 10) m = "0"+m
    if(s < 10) s = "0"+s
    return [h, m, s]
}
function checkSAtate(){ // CHANGE L'ETAT DES TACHES (ONGOING, OVER, UPCOMING)
    const ALL_TASK_COLUMNS = document.querySelectorAll(".task-column")
    if(ALL_TASK_COLUMNS.length > 0){
        ALL_TASK_COLUMNS.forEach(element => {
            divInfos = element.querySelectorAll(".infos")
            if(divInfos.length > 0){
                divInfos.forEach(div => {
                    dateUser = div.children[3].children[1]
                    startTime  = div.children[1].children[1]
                    endingTime = div.children[2].children[1]
                    divDescription = div.previousElementSibling
                    stateIcon = divDescription.querySelector(".state-icon")
                    stateText = divDescription.querySelector(".state-text")
                    actualTime = new Date().getHours() + ":" + new Date().getMinutes()
                    const a = dateUser.innerHTML
                    if (upcomingOrOverOrOngoing(a+ " " + startTime.innerHTML, a+ " " + endingTime.innerHTML) == "ongoing"){
                        stateIcon.innerHTML = "autorenew"
                        stateText.innerHTML = "on going"        
                        divDescription.setAttribute("class", "description ongoing")   
                    }
                    if (upcomingOrOverOrOngoing(a+ " " + startTime.innerHTML, a+ " " + endingTime.innerHTML) == "upcoming"){
                        stateIcon.innerHTML = "upcoming"
                        stateText.innerHTML = "upcoming"        
                        divDescription.setAttribute("class", "description upcoming")   
                    }
                    actualDate = new Date;
                    month = (actualDate.getMonth() + 1) < 10 ? "0" + (actualDate.getMonth() + 1) : actualDate.getMonth() + 1
                    day = (actualDate.getDate()) < 10 ? "0" + (actualDate.getDate()) : actualDate.getDate()
                    tay = actualDate.getFullYear() + "-" + month  + "-" + day
                    if(upcomingOrOverOrOngoing(a+ " " + endingTime.innerHTML, a+ " " + startTime.innerHTML) == "over" || (diffSeconds(actualTime, endingTime.innerHTML ) <= 0 && a == tay)){        
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
function edit(parent) { //REMPLIR LES INFOS DUNE TACHE DANS LE MODAL
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
function hideOrShowColumn1IconTrash(){ //On ne peut supprimer la première colonne que si elle est la seule
    if(document.querySelectorAll(".task-column").length > 1) 
        document.getElementById("1").querySelector(".footer").querySelector("span").style.visibility = "hidden"
    else if (document.querySelectorAll(".task-column").length == 1) 
        document.getElementById("1").querySelector(".footer").querySelector("span").style.visibility = "visible"
}
function refreshColumnIdAndTitle(){ //REFRESH COLUMN ID AND TITLE
    setTimeout(() => { 
        document.querySelectorAll(".task-column").forEach((input, i) => {
            input.id = (i+1)
            if(isNameColumn(input.querySelector(".head").querySelector("input").value))
                input.querySelector(".head").querySelector("input").value = "Column " + (i+1)
        })
    }, 1000)
}
function add_in_the_trash(){ //PUT TASKS IN THE TRASH
    document.querySelectorAll(".delete-task").forEach(el => {
        el.addEventListener("click", (e) => {
            TRASH_BODY.querySelector(".body").appendChild(e.target.parentElement.parentElement.parentElement)
            TRASH_BODY.classList.add("show-modal");
        })
    })
}
function restoreTask(){ //RESTAURER LES TÂCHES
    document.querySelectorAll(".restore").forEach(el => {
        el.addEventListener("click", (e) => {
            parentID = e.target.previousElementSibling.innerHTML
            if(document.getElementById(parentID) !== null){
                document.getElementById(parentID).querySelector(".body").appendChild(e.target.parentElement.parentElement.parentElement)
                e.target.parentElement.parentElement.parentElement.classList.remove("do-not-show-right-and-left-icon")
            }
            else{
                if(document.getElementById("1") !== null){
                    document.getElementById("1").querySelector(".body").appendChild(e.target.parentElement.parentElement.parentElement)
                    e.target.parentElement.parentElement.parentElement.classList.remove("do-not-show-right-and-left-icon")
                }
                else
                    showHide("hidden", "visible", "IL N'Y A PAS DE COLONNES !")   
            }
        })
    })
}
function appendElements(parent, array){ //appendChild répétitif
    array.forEach(element => parent.appendChild(element))
}
function createPWith2Spans(span1text, span2text){
    p = document.createElement("p")
    span1 = document.createElement("span")
    span1.innerText = span1text
    span2 = document.createElement("span")
    span2.innerText = span2text
    appendElements(p, [span1, span2]);
    return p;
}
function getColumnsInfos(classToSearch){ // TABLEAU DINFOS DE TOUTES LES COLONNES ET LEURS ETATS DANS LE FICHIER JSON
    ColumnArray = [];
    document.querySelectorAll(classToSearch).forEach(column => {
        taskArray = []
        tasks = column.querySelectorAll(".task");
        tasks.forEach(task => {
            divDesc = task.querySelector(".description")
            divInfo = task.querySelector(".infos")
            tab = [divDesc.children[1].children[3].innerText, divInfo.children[3].children[1].innerText, divInfo.children[1].children[1].innerText,  divInfo.children[2].children[1].innerText, task.id, column.id,  divDesc.children[1].children[5].innerText]
            taskArray.push(tab);
        })
        ColumnArray.push(taskArray);
    })
    return ColumnArray;
}
function fillState(data){ //REMPLIR LES INFOS DUN ETAT
    SECTION.innerHTML = ""
    if(data.columnsArray.length > 0)
        data.columnsArray.forEach(column => {
            createColumn()
            column.forEach(task => {
                createTask(task[0], task[1], task[2], task[3], task[4])
                document.getElementById(task[5]).querySelector(".body").appendChild(document.getElementById(task[4]))
            })
        })
    if(data.trash.length > 0)
        data.trash.forEach(ar => ar.forEach(task => { 
            createTask(task[0], task[1], task[2], task[3], task[4])
            TRASH_BODY.querySelector(".body").appendChild(document.getElementById(task[4]))
            document.getElementById(task[4]).querySelector(".column-id").innerText = task[6]
        }))
}
function list_all_states(){ //LISTER LES ETATS
    LIST_BODY.querySelector(".body").innerHTML = ""
    fetch(API_URL + "list_all_states").then(response => response.json().then(data => { // FILL THE LIST OF ALL STATES
        if(data.length > 0)
            data.forEach(state => {
                div = document.createElement("div");
                span = document.createElement("span");
                span.innerHTML = "restore";
                span.setAttribute("class", "material-icons restore-state");
                span.addEventListener("click", () => {   fillState(state); })
                p1 = createPWith2Spans("Date: ", state.date)
                p2 = createPWith2Spans("Time: ", state.time)
                p3 = createPWith2Spans("Number of tasks: ", state.allTasks)
                p4 = createPWith2Spans("Number of Columns: ", state.allColumns)
                appendElements(div, [span, p1, p2, p3, p4]);   
                LIST_BODY.querySelector(".body").appendChild(div);
            })
        else{
            h1 = document.createElement("h1");
            h1.innerHTML = "There is no state !"
            LIST_BODY.querySelector(".body").appendChild(h1);
        }
    }))
    open(LIST_BODY, TRASH_BODY)
}
function open(open, close){
    open.classList.toggle("show-modal");  close.classList.remove("show-modal"); 
}
function showHide(attribut1, attribut2, text=""){
    MODAL.classList.add("show-modal");
    MODAL.querySelector(".modal").style.visibility = attribut1;
    MODAL.querySelector(".alert").style.visibility = attribut2;
    ALERT.querySelector(".text-alert").innerHTML = text;
}
function updateTaskOriginID(){
    document.querySelectorAll(".task-column").forEach(column => {
        tasks = column.querySelectorAll(".column-id")
        if(tasks.length > 0)
            tasks.forEach(t => t.innerHTML = column.id)       
    })
}
