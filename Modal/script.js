const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const signup = document.getElementById("signup");
const modal = document.getElementById("modal");

signup.addEventListener("click", ()=>{
    modal.classList.add("show-modal")
});

close.addEventListener("click", ()=>{
    modal.classList.remove("show-modal")
});

toggle.addEventListener("click", function(){
    document.body.classList.toggle('show-nav'); 
});

window.addEventListener('click', function(e)
{
    console.log(e.target)
    if(e.target == modal)
        modal.classList.remove('show-modal');
    else
        return false;
});