const cartPage = document.querySelector(".cart .container");
let userCart = JSON.parse(localStorage.getItem("selectedUser"));
const removeBtn = document.querySelectorAll(".removeProduct")
const username = document.querySelector("#UserName");
const SelectedUser = JSON.parse(localStorage.getItem("selectedUser"));
let count = 0
logOut = document.getElementById("LogOut");
logOut.addEventListener("click", () => {
    localStorage.setItem("loginCheck" , false)
    window.location.reload()
    window.location.href = "../index.html"
})
username.innerHTML = SelectedUser.name;
function displayCart(){
    cartPage.innerHTML = "";
    count = 0;
    userCart.cart.forEach(e => {
    const ProductInCart = document.createElement("div");
    ProductInCart.className = "productInCart col-span-1 max-lg:col-span-2 max-sm:flex-col";
    ProductInCart.innerHTML = `
    <img class="productInCartImage" src=${e.content.image} alt="productImage" />
    <p class="productName">${e.content.title}</p>
    <p class="productPrice w-[90px]">${e.content.price} $</p>
    <button onclick="removeProduct(${e.productId})" class="removeProduct">Remove</button>
    `
    count += e.content.price

    cartPage.appendChild(ProductInCart);
});
    const totalPriceSection = document.createElement("div");
    totalPriceSection.className = "totalPriceSection col-span-2 flex justify-start gap-4 items-center";
    totalPriceSection.innerHTML = `
    <p class="text-lg">Total Price Is : </p>
    <p class="totalPrice text-lg">${count.toFixed(2)} $</p>
    `;
    cartPage.prepend(totalPriceSection);
    
    
}


function removeProduct(id) {
    userCart.cart = userCart.cart.filter(e=> e.productId !== id);
    localStorage.setItem("selectedUser", JSON.stringify(userCart));
    displayCart()
    RemoveAlert()
}
displayCart()



let alertBox = document.querySelector(".alertBox")

function RemoveAlert() {
    const alert = document.createElement("li")
    alert.className = "Alert"
    alert.innerHTML = "the product has been dleated from the cart"
    alertBox.appendChild(alert)
    setTimeout(function() {
        alert.style.display = 'none'; 
      }, 1500);

}
