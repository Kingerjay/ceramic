const params = new URLSearchParams(window.location.search);

let id = params.get("id")
console.log(id);

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.querySelector("#cart-num").innerText = cart.length;

    let username = localStorage.getItem("username")

    if (!username) {
        username = prompt("Kindly Enter your Username")
    }

    if (username) {
        localStorage.setItem("username", username)
    }

    else {
        username = "Guest"
        localStorage.setItem("username", username)

    }
    
    let userDisplay = document.querySelector("#username") 
    userDisplay.innerText = username

    // For Profile Image
    let profileImgDiv = document.querySelector(".profile-imgdiv")
    profileImgDiv.style.backgroundColor = "green"
    

    let profileText = document.createElement("p")
    profileText = username.slice(0,1)

    profileImgDiv.innerText = profileText


    // For Logout
    const logout = document.querySelector("#logout")

    logout.addEventListener("click", () => {
        localStorage.removeItem("username")
        location.reload()
    })


    // For Dropdown menu
    const arrow = document.querySelector(".profile-arrow")
    const dropdown = document.querySelector(".dropdown")

    arrow.addEventListener("click", (event) => {
        dropdown.classList.toggle("show")
        event.stopPropagation();
    })
    
    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
        dropdown.classList.remove("show");
    });


})

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];  // Get cart from localStorage
    let cartNum = document.querySelector("#cart-num");
    cartNum.innerText = cart.length; 
    location.reload()
    }
});

let container = document.querySelector(".product-detail")
let imageDiv = document.querySelector(".image-div")
let contentDiv = document.querySelector(".content-div")
let cartNum = document.querySelector("#cart-num");


fetch(`https://fakestoreapi.com/products/${id}`)
    .then(response => response.json())
    .then(product => {
       
        
        let image = document.createElement("img")
        image.style.width = "350px"
        image.style.height = "450px"
        image.src = product.image
        imageDiv.appendChild(image)

        let title = document.createElement("p")
         title.style.fontWeight = "700"
         title.style.fontSize = "30px"
        title.innerText = product.title
        contentDiv.appendChild(title)

        let description = document.createElement("p")
         description.style.fontSize = "20px"
         description.style.width = "80%"
        description.innerText = product.description
        contentDiv.appendChild(description)

        let price = document.createElement("p")
        price.style.fontWeight = "bold"
        price.style.fontSize = "30px"
        price.style.margin = "5px 0"
        price.innerText = "$" + product.price
        contentDiv.appendChild(price)

        let ratingDiv = document.createElement("div");
ratingDiv.style.display = "flex";
ratingDiv.style.gap = "5px";
ratingDiv.style.fontSize = "20px";

// Assuming 'product.rating.rate' is a number between 0 and 5
let fullStars = Math.round(product.rating.rate); // Round to nearest whole number
let totalStars = 5; // Max star count

// Create stars based on rating
for (let i = 1; i <= totalStars; i++) {
    let star = document.createElement("span");
    star.className = "fa fa-star"; // Use Font Awesome star class
    star.style.color = i <= fullStars ? "#f5b301" : "#ccc"; // Filled or unfilled color
    ratingDiv.appendChild(star);
}

// Add rating count next to stars
let count = document.createElement("div");
count.innerText = `(${product.rating.count} verified ratings)`;
ratingDiv.appendChild(count);

contentDiv.appendChild(ratingDiv);

         let button = document.createElement("button")
         button.classList.add("button2");
        button.innerText = "ADD TO CART"
        contentDiv.appendChild(button)

        // Add to cart button
           button.addEventListener("click" , ()=> {
        let productExistsInCart = cart.find(item => item.id == product.id)
        console.log(productExistsInCart)
    if(productExistsInCart){
        productExistsInCart.quantity = productExistsInCart.quantity +1
    }
    else{
        product.quantity =1
        cart.push(product)
        cartLength = cart.length
    cartNum.innerText =cartLength
    }
    
    localStorage.setItem("cart", JSON.stringify(cart))

    getCart = localStorage.getItem("cart")

    let originalCart = JSON.parse(getCart)

    cartNum.innerText = cart.length
    
    
    
})

       
    })


