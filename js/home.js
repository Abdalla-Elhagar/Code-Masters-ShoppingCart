document.addEventListener('DOMContentLoaded', function() {
    let cartCount = document.querySelector(".cartCount");
    const userName = document.getElementById("UserName");
    const logOut = document.getElementById("LogOut");
    let selectedUser = JSON.parse(localStorage.getItem("selectedUser"));
    let UserData = JSON.parse(localStorage.getItem("userData"));

    if (!selectedUser) {
        selectedUser = {id:'' ,name: '', email: '', pass: '', cart:[]};
        localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
    }

    if (logOut) {
        logOut.addEventListener("click", () => {
            localStorage.setItem("loginCheck", false);
            window.location.reload();
        });
    }

    if (selectedUser && userName) {
        userName.textContent = selectedUser.name;
    }

    if (cartCount && selectedUser.cart) {
        cartCount.textContent = selectedUser.cart.length;
        cartCount.style.display = selectedUser.cart.length > 0 ? "flex" : "none";
    }

    fetchProducts();

    function fetchProducts() {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(products => displayProductData(products))
            .catch(error => console.error("Error fetching products:", error));
    }

    function displayProductData(products) {
        let productsSection = document.querySelector(".products .container");
        productsSection.innerHTML = ""; 

        products.forEach(e => {
            const productElement = document.createElement("div");
            productElement.setAttribute('data-id', e.id);
            productElement.className = "productBox col-span-1 max-lg:col-span-2 max-sm:col-span-4";
            productElement.innerHTML = `
                <img class="productImage" src="${e.image}" alt="productImage" />
                <p class="productName">${e.title}</p>
                <p class="price">${e.price}$</p>
                <button class="addToCar">Add To Cart</button>
            `;

            productsSection.appendChild(productElement);
        });

        addToCart(products);
    }

    function addToCart(products) {
        const addToCatButtons = document.querySelectorAll(".addToCar");

        addToCatButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const productElement = e.target.closest(".productBox");
                const productId = productElement.getAttribute("data-id");
                const product = products.find(p => p.id == productId);
                let productToAdd = { productId: Date.now(), content: product };

                addProductsToCustomerCart(productToAdd);
                addTocartAlert();
            });
        });
    }

    function addProductsToCustomerCart(product) {
        selectedUser.cart = [...selectedUser.cart, product];
        localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
        addselectedToUserData(selectedUser.id, selectedUser.cart);

        if (cartCount) {
            cartCount.textContent = selectedUser.cart.length;
            cartCount.style.display = selectedUser.cart.length > 0 ? "flex" : "none";
        }
    }

    function addselectedToUserData(id, cart) {
        UserData.forEach(user => {
            if (user.id == id) {
                user.cart = cart;
            }
        });
        localStorage.setItem("userData", JSON.stringify(UserData));
    }

    let alertBox = document.querySelector(".alertBox");
    function addTocartAlert() {
        const alert = document.createElement("li");
        alert.className = "Alert";
        alert.innerHTML = "The product has been added to the cart";
        alertBox.appendChild(alert);

        setTimeout(function() {
            alert.style.display = 'none';
        }, 3000);
    }
});
