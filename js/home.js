

const userName = document.getElementById("UserName"),
logOut = document.getElementById("LogOut");
let UserData = JSON.parse(localStorage.getItem("userData"));


logOut.addEventListener("click", () => {
    localStorage.setItem("loginCheck" , false)
    window.location.reload()
})

let selectedUser = JSON.parse(localStorage.getItem("selectedUser"));
if (localStorage.getItem("selectedUser")) {
    userName.textContent = selectedUser.name;
}



function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(products=> displayProductData(products))

}



function displayProductData(products) {
    let productsSection = document.querySelector(".products .container")
    productsSection.innerHTML = ""
    products.forEach(e => {
        const productElement = document.createElement("div")
        
        productElement.setAttribute('data-id', e.id);
        productElement.className = "productBox col-span-1 max-lg:col-span-2 max-sm:col-span-4"
        productElement.innerHTML = `
        <img class="productImage" src=${e.image} alt="productImage"
        <p class="productName">${e.title}</p>
        <p class="price">${e.price}$</p>
        <button class="addToCar">Add To Cart</button>
        `

       
        productsSection.appendChild(productElement)
    })

    addToCart(products)
}


    function addToCart(products) {

        
        const addToCat = document.querySelectorAll(".addToCar")
        addToCat.forEach(button => {
            button.addEventListener("click", (e) => {
                const productElement = e.target.closest(".productBox")
                const productId = productElement.getAttribute("data-id")
                const product = products.find(p=>p.id == productId) 
                let arrOfProducts = {productId:Date.now() , content: product}
                addProductsToCustomerCart(arrOfProducts)
                addTocartAlert()
            })
        })
    }

    function addProductsToCustomerCart(product) {
        
        selectedUser.cart = [...selectedUser.cart,product]
        localStorage.setItem("selectedUser", JSON.stringify(selectedUser))
        addselectedToUserData(selectedUser.id ,selectedUser.cart)
    }
            
fetchProducts()

function addselectedToUserData(id,cart) {

    UserData.forEach(user =>  {
        if (user.id == id) {
            user.cart = cart
        }
        
    })
    localStorage.setItem("userData", JSON.stringify(UserData))
}

let alertBox = document.querySelector(".alertBox")
function addTocartAlert() {
    const alert = document.createElement("li")
    alert.className = "Alert"
    alert.innerHTML = "the product has been added to cart"
    alertBox.appendChild(alert)
    setTimeout(function() {
        alert.style.display = 'none'; 
      }, 1500);

}
