ADD_COLUMN.addEventListener("click", () => {  createColumn() })  // AJOUT DE COLONNES
ARROW_DOWN.addEventListener("click", () => { HEADER.classList.remove("close") }) // AUGMENTER LA TAILLE DU HEADER
CLOSE_ICON_HEADER.addEventListener("click", () => {  HEADER.classList.add("close") })  //REDUIRE LA TAILLE DU HEADER
CLOSE_ICON_MODAL.addEventListener("click", ()=>{ MODAL.classList.remove("show-modal") }); //FERMER LE MODAL
BTN_CLOSE_ALERT.addEventListener("click", () => {   MODAL.classList.remove("show-modal") }) //FERMER MODAL APRES UNE ALERTE
TASK_INFOS.forEach(element => element.addEventListener("blur", () => { AreAllInfosCorrect() })) // VERIFIER INFOS DU MODAL
TASK_INFOS.forEach(element => element.addEventListener("input", () => { AreAllInfosCorrect() })) // VERIFIER INFOS DU MODAL
TRASH_ICON.addEventListener("click", () => {   //FERMER OU OUVRIR LA CORBEILLE
    open(TRASH_BODY, LIST_BODY);
}) 
LIST_STATES_BTN.addEventListener("click", () => {    //FERMER OU OUVRIR LA LISTE DES ETATS
    list_all_states()
})
TASK_BUTTON_SUBMIT.addEventListener("click", () => { // CREER UNE TACHE
    id = "task_" + (document.querySelectorAll(".task").length + 1)
    createTask(TASK_DESCRIPTION.value, TASK_DATE.value, TASK_START_TIME.value, TASK_ENDING_TIME.value, id);
    showHide("hidden", "visible", "TÂCHE CRÉÉE !")
})
TASK_BUTTON_EDIT.addEventListener("click", () => { //EDITER UNE TACHE
    id = MODAL.querySelector(".keep-task-id").value
    parent = document.getElementById(id)
    divDesc = parent.querySelector(".description")
    divInfo = parent.querySelector(".infos")
    divInfo.children[3].children[1].innerText = TASK_DATE.value 
    divInfo.children[1].children[1].innerText = TASK_START_TIME.value
    divInfo.children[2].children[1].innerText  = TASK_ENDING_TIME.value
    divDesc.children[1].children[3].innerText = TASK_DESCRIPTION.value 
    secondes = diffSeconds(TASK_START_TIME.value, TASK_ENDING_TIME.value) //remettre a jour la duree
    hms = taskCountdown(secondes)
    divInfo.children[0].children[1].innerHTML = hms[0] + ":" + hms[1] + ":" + hms[2]
    MODAL.classList.remove("show-modal")
})
ADD_TASK.addEventListener("click", ()=>{ // OUVRIR MODAL DAJOUT DE TACHE
    if(document.getElementById("1") !== null){
        cleanForm()
        MODAL.classList.remove("edit")
        TASK_BUTTON_SUBMIT.setAttribute("disabled", "disabled")
        showHide("visible", "hidden")
    }
    else
        showHide("hidden", "visible", "Vous devez avoir au moins une colonne avant de créer une tâche !")
});
SAVE_STATE.addEventListener("click", () => { //SAUVEGARDER UN ETAT
    main = document.querySelector("main")
    allTasks = main.querySelectorAll(".task").length
    allColumns = main.querySelectorAll(".task-column").length
    archivedTasks = main.querySelector(".trash").querySelectorAll(".task").length
    time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() 
    date = new Date().getDate() + "-" + (new Date().getMonth()+1) + "-" + new Date().getFullYear() 
    fetch("http://localhost/my_task/public/?controller=tache&action=save_state", {
        method: "POST",
        body: JSON.stringify({
            date: date,
            time: time,
            allTasks: allTasks,
            allColumns: allColumns,
            archivedTasks: archivedTasks, 
            columnsArray : getColumnsInfos(".task-column"),
            trash : getColumnsInfos(".trash")
        })
    })
    list_all_states();
    LIST_BODY.classList.add("show-modal")
})
setTimeout(() => {
    fetch(API_URL+"list_last_state").then(response => response.json().then(data => { // GET THE LAST STATE
        fillState(data)
    }))
}, 3000)
setInterval(() => { checkSAtate() }, 1000);
