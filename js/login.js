
let Lemail = document.getElementById("LemailInput"),
Lpass = document.getElementById("LpassInput"),
logInbutton = document.getElementById("logInbutton"),
loginForm = document.getElementById("loginForm"),
registerPageBtn = document.getElementById("registerPageBtn"),
loginPage = document.querySelector(".login"),
registerPage = document.querySelector(".register"),
LpassAlert = document.getElementById("LPassAlert"),
LemailAlert = document.getElementById("EmailAlert");


registerPageBtn.addEventListener("click", ()=>{
    window.location.href = "register.html"
})


loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
})

logInbutton.addEventListener("click", ()=>{
    
    Lemail.value.length < 1 ? LemailAlert.innerHTML = "Email is required" : LemailAlert.innerHTML = "";


    if (Lpass.value.length < 6 & Lpass.value.length > 0) {
        LpassAlert.innerHTML = "your password is short" 
    }else if (Lpass.value.length == 0 ) {
        LpassAlert.innerHTML = "the password is required"
    }else {
        LpassAlert.innerHTML = ""
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailPattern.test(Lemail.value) && Lemail.value.length > 0 && Lpass.value.length > 5){
        if(localStorage.getItem("userData")) {
            check(Lemail.value, Lpass.value)
        }
        else {
            LpassAlert.innerHTML = "email or password has been error"
        }
        
    }    
})

    let userData = JSON.parse(localStorage.getItem("userData"))

function check(email, password) {
    userData.forEach(e => {
    if(e.email == email && e.pass == password) {
        LpassAlert.innerHTML = ""
        localStorage.setItem("loginCheck", true)
        selectuser(e)
        window.location.href = "../index.html"
    } else {
        LpassAlert.innerHTML = "email or password has been error"
    }   
    });
}
function selectuser(user) {
    localStorage.setItem("selectedUser", JSON.stringify(user))
}



