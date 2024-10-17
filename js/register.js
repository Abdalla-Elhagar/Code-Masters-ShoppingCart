loginPage = document.querySelector(".login");
registerPage = document.querySelector(".register");
let loginPageBtn = document.getElementById("loginPageBtn"),
registerBtn = document.getElementById("RegisterBtn"),
RegisterForm = document.getElementById("RegisterForm"),
nameError = document.getElementById("nameAlert"),
EmailError = document.getElementById("EmailAlert"),
PassError = document.getElementById("PassAlert"),
name = document.getElementById("RnameInput"),
email = document.getElementById("RemailInput"),
pass = document.getElementById("RpassInput");
let userData = localStorage.getItem("userData");

RegisterForm.addEventListener("submit", (e) => {
    e.preventDefault()
})


loginPageBtn.addEventListener("click", ()=>{
    window.location.href = "login.html"
})
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

registerBtn.addEventListener("click", ()=>{


    name.value == "" ? nameError.innerHTML = "the Name is required" : nameError.innerHTML = "" ;
    email.value == "" ? EmailError.innerHTML = "the Email is required" : EmailError.innerHTML = "";

    if (pass.value.length < 6 & pass.value.length > 0) {
        PassError.innerHTML = "the password is short"
    }else if (pass.value.length < 1) {
        PassError.innerHTML = "the password is required" 
    }else {
        PassError.innerHTML = ""
    }
    addUserToLocalStorage()
})


function addUserToLocalStorage() {
    
    
    if(pass.value.length >= 6 & emailPattern.test(email.value) & name.value != "") {
        if (localStorage.getItem("userData")) {
            userData = [userData]
        }else {
            let userData = []
        }
        
        userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : []
        userData = [...userData, {id:userData.length ,name: name.value, email: email.value, pass: pass.value, cart:[]}]
        localStorage.setItem("userData", JSON.stringify(userData))
        
        pass.value = ""
        email.value = ""
        name.value = ""
        window.location.href = "login.html"
    }
    
}