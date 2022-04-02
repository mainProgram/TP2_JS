ADD_TASK.addEventListener("click", ()=>{
    if(document.getElementById("1") !== null){
        cleanForm()
        MODAL.classList.remove("edit")
        TASK_BUTTON_SUBMIT.setAttribute("disabled", "disabled")
        MODAL.classList.add("show-modal")
        MODAL.querySelector(".modal").style.visibility = "visible"
        MODAL.querySelector(".alert").style.visibility = "hidden"
    }
    else{
        MODAL.classList.add("show-modal")
        MODAL.querySelector(".modal").style.visibility = "hidden"
    }
});

CLOSE_ICON_MODAL.addEventListener("click", ()=>{
    MODAL.classList.remove("show-modal")
});

CLOSE_ICON_HEADER.addEventListener("click", () => {
    HEADER.classList.add("close")
})

ARROW_DOWN.addEventListener("click", () => {
    HEADER.classList.remove("close")
})

ADD_COLUMN.addEventListener("click", () => {
    createColumn()
})

TASK_INFOS.forEach(element => element.addEventListener("blur", () => {
    AreAllInfosCorrect()
}))

TASK_INFOS.forEach(element => element.addEventListener("input", () => {
    AreAllInfosCorrect()
}))

TASK_BUTTON_SUBMIT.addEventListener("click", () => {
    createTask()
    MODAL.classList.add("show-modal")
    MODAL.querySelector(".modal").style.visibility = "hidden"
    MODAL.querySelector(".alert").style.visibility = "visible"
    ALERT.querySelector(".text-alert").innerHTML = "TÂCHE CRÉÉE !"
})

setInterval(() => {
    checkSAtate()
}, 1000)

TRASH_ICON.addEventListener("click", () => {
    TRASH_BODY.classList.toggle("show-modal")
})

TASK_BUTTON_EDIT.addEventListener("click", () => {
    id = MODAL.querySelector(".keep-task-id").value
    parent = document.getElementById(id)

    divDesc = parent.querySelector(".description")
    divInfo = parent.querySelector(".infos")
    dateUser = divInfo.children[3].children[1]
    startTime = divInfo.children[1].children[1]
    endingTime = divInfo.children[2].children[1]
    desc = divDesc.children[1].children[3]
    
    dateUser.innerText = TASK_DATE.value 
    startTime.innerText = TASK_START_TIME.value
    endingTime.innerText  = TASK_ENDING_TIME.value
    desc.innerText = TASK_DESCRIPTION.value 

    secondes = diffSeconds(TASK_START_TIME.value, TASK_ENDING_TIME.value)
    hms = taskCountdown(secondes)
    divInfo.children[0].innerText = "Duration: " + hms[0] + ":" + hms[1] + ":" + hms[2]

    MODAL.classList.remove("show-modal")
})

BTN_CLOSE_ALERT.addEventListener("click", () => {
    MODAL.classList.remove("show-modal")
})

SAVE_STATE.addEventListener("click", () => {
    content = document.querySelector("main")
    allTasks = main.querySelectorAll(".task").length
    allColumns = main.querySelectorAll(".task-column").length
    archivedTasks = main.querySelector(".trash").querySelectorAll(".task").length
    time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() 
    date = new Date().getDate() + "-" + (new Date().getMonth()+1) + "-" + new Date().getFullYear() 
})

LIST_STATES_BTN.addEventListener("click", () => {
    LIST_BODY.classList.toggle("show-modal")
})
