const home = document.querySelector(".home"),
logIn = document.querySelector(".login");

window.addEventListener("load", () => {
    if(JSON.parse(localStorage.getItem("loginCheck")) == false) {
    window.location.href = "pages/login.html"
}
})
