    
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cartItems);

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
    location.reload();
    }
});

let container = document.querySelector(".cart-show");
let summaryContainer = document.querySelector(".cart-summary");
let cartCount = document.querySelector("#cart-no");
let cartNum = document.querySelector("#cart-num");

let totalPrice = 0;
let allQuantity = 0;
let subTotal = 0;

function updateSummary() {
    // Update total price and quantity after removal
    totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    allQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // let subTotal = `$${totalPrice}`;
    let subTotal = `$${Math.ceil(totalPrice)}.00`;
    document.querySelector(".summaryDiv p:nth-child(2)").innerText = subTotal;
    cartCount.innerText = `( ${allQuantity} )`;
    // cartNum.innerText = `${allQuantity}`;
    document.querySelector(".checkout").innerText = "CHECKOUT" + " (" + subTotal + ")";
}

// Check if cartItems is empty and display a message if so
if (cartItems.length === 0) {
    let emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-message");
    emptyMessage.innerText = "Your cart is empty.";
    container.appendChild(emptyMessage);
} else {
// Initialize cart items
cartItems.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("divshow");

    let image = document.createElement("img");
    image.classList.add("image");
    image.style.width = "100px";
    image.style.height = "100px";
    image.style.cursor = "pointer"
    image.src = item.image;

    image.addEventListener('click',()=>{
        
        window.location.href=`product.html?id=${item.id}`
    });

    div.appendChild(image);

    let title = document.createElement("p");
    title.classList.add("title");
    title.style.cursor = "pointer"
    title.innerText = item.title;

    title.addEventListener('click',()=>{
        
        window.location.href=`product.html?id=${item.id}`
    });

    div.appendChild(title);

    let price = document.createElement("p");
    price.classList.add("price");
    price.innerText = `$${item.price}`;
    div.appendChild(price);


    let quantityDiv = document.createElement("div")
    quantityDiv.style.display = "flex"
    quantityDiv.style.gap = "10px"
    quantityDiv.style.fontSize = "20px"

    let minus = document.createElement("p");
    minus.innerHTML = '<span class="fa fa-minus-circle"></span>'
    quantityDiv.appendChild(minus)

    let quantity = document.createElement("p");
    quantity.classList.add("quantity");
    quantity.innerText = item.quantity;
     quantityDiv.appendChild(quantity)

     let plus = document.createElement("p");
    plus.innerHTML = '<span class="fa fa-plus-circle"></span>'
    quantityDiv.appendChild(plus)

    // Add to cart button
           plus.addEventListener("click" , ()=> {
        let productExistsInCart = cartItems.find(product => item.id == product.id)
    if(productExistsInCart){
        productExistsInCart.quantity = productExistsInCart.quantity +1
    }
    else{
        item.quantity =1
        cartItems.push(item)
    }

    updateSummary(); // Update total and quantity display
        updateCartDisplay();
    
    localStorage.setItem("cart", JSON.stringify(cartItems))
})

    minus.addEventListener("click" , ()=> {
let productExistsInCart = cartItems.find(product => product.id === item.id);
       
    if(productExistsInCart.quantity > 1){
        productExistsInCart.quantity = productExistsInCart.quantity - 1

    updateSummary(); // Update total and quantity display
        updateCartDisplay();
    
         localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    else{
        //  productExistsInCart.quantity = 1
        // cartItems.splice(index, 1);  
        // quantity.innerText =  productExistsInCart.quantity
        // localStorage.setItem('cart', JSON.stringify(cartItems));
    }  
    
})


    div.appendChild(quantityDiv);




    let removeProduct = document.createElement("p");
    removeProduct.classList.add("remove");
    removeProduct.innerHTML = '<i class="fa fa-trash-o" style="font-size:36px"></i>';

    // Remove product on click
    removeProduct.addEventListener("click", () => {
        cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        div.remove(); // Remove the item from DOM
        updateSummary(); // Update total and quantity display
        updateCartDisplay();

         // Add Alert
    const alertDiv = document.createElement("div");
    alertDiv.innerText = "Removed from Cart!";
    alertDiv.style.position = "fixed";
    alertDiv.style.top = "80px";
    alertDiv.style.right = "20px";
    alertDiv.style.backgroundColor = "#28a745";
    alertDiv.style.color = "white";
    alertDiv.style.opacity = "0.6";
    alertDiv.style.padding = "10px 50px";
    alertDiv.style.borderRadius = "5px";
    alertDiv.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
    alertDiv.style.fontSize = "16px";
    alertDiv.style.zIndex = "1000";
    document.body.appendChild(alertDiv);

    // Remove alert after 3 seconds
    setTimeout(() => {alertDiv.remove(); }, 5000);


    });

    div.appendChild(removeProduct);

    container.appendChild(div);

    totalPrice += item.price * item.quantity;
    subTotal = Math.ceil(totalPrice);
    allQuantity += item.quantity;

    
});

}

// Create summary elements
let summaryDiv = document.createElement("div");
summaryDiv.classList.add("summaryDiv");

let summaryParagraph = document.createElement("p");
summaryParagraph.innerText = "Sub Total";
summaryDiv.appendChild(summaryParagraph);

let summaryTotal = document.createElement("p");
summaryTotal.innerText = `$${subTotal}.00`;
summaryDiv.appendChild(summaryTotal);

let checkout = document.createElement("p");
checkout.classList.add("checkout");
checkout.innerText = `CHECKOUT ($${subTotal}.00)`;

cartCount.innerText = `( ${allQuantity} )`;
// cartNum.innerText = `${allQuantity}`;

summaryContainer.appendChild(summaryDiv);
summaryContainer.appendChild(checkout);

// Function to update the cart display after an item is removed
function updateCartDisplay() {
    if (cartItems.length === 0) {
        
        let emptyMessage = document.createElement("p");
        emptyMessage.classList.add("empty-message");
        emptyMessage.innerText = "Your cart is empty.";
        container.appendChild(emptyMessage);
        
        cartCount.innerText = "( 0 )";
        cartNum.innerText = "0";
    } else {
        // Refresh page elements if needed
        location.reload();
    }
}


const initializeTransaction = async(email, amount)=>{
    const response = await fetch("https://api.budpay.com/api/v2/transaction/initialize",{
        method:"POST",
        headers:{
            "Authorization":`Bearer sk_test_jkny7nxy339rmel1uzrw0tpktbrjr9gg0og16ws`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email,
            amount:amount.toString(),
            currency:"USD"
        })
    })

    return response
}

const handleCheckout = async()=>{
    let amount = subTotal;
    let email = "ogilikingsley96@gmail.com"
    let response = await initializeTransaction(email, amount)
    
    const data = await response.json()
    
    const authorization_url = data.data.authorization_url
    // console.log(authorization_url);
    
    let url = decodeURI(authorization_url)
    console.log(url);
    
    window.open(url,"_blank")
}

checkout.addEventListener('click', ()=>{
    handleCheckout()
})


// Get loader element
const loader = document.getElementById("loader");

function showLoader() {
    loader.style.display = "block"; // Show loader
}

function hideLoader() {
    loader.style.display = "none"; // Hide loader
}

// Wrap your data fetch or loading process with the loader functions
async function loadData() {
    showLoader(); // Show loader before data loading

    try {
        // Simulate data fetching with a delay (or add your actual data fetching code)
        await new Promise(resolve => setTimeout(resolve, 500));
        // Your data fetching code goes here, e.g., await fetchData();

    } catch (error) {
        console.error("Error loading data:", error);
    } finally {
        hideLoader(); // Hide loader once data is loaded or on error
    }
}

// Call the function to start loading
loadData();
