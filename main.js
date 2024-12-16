const cartNum = document.querySelector("#cart-num")
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartLength = cart.length
cartNum.innerText = cartLength

let sidebar = document.querySelector(".side-bar")
let mainContent = document.querySelector(".main-content")
let mainContentdiv = document.createElement("div")
mainContentdiv.classList.add("mainContentdiv")

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

    // let profileimg = document.createElement("img")

    // profileimg.alt = username.slice(0,1)

    // profileImgDiv.appendChild(profileimg)


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


async function getAllCategories() {
    let response = await fetch("https://fakestoreapi.com/products/categories")

    let categories = await response.json()

    return categories
}

async function getAllProducts() {
    let response = await fetch("https://fakestoreapi.com/products")

    let products = await response.json()
    return products
}

async function getProductsByCategory(a) {
    let response = await fetch(`https://fakestoreapi.com/products/category/${a}`)

    let products = await response.json()
    return products
}

async function displayProducts(products) {
    mainContent = document.querySelector(".main-content")
    if (mainContentdiv.childElementCount > 0) {
        mainContentdiv.innerHTML =  " "
    } 

    products.forEach((product, index) => {
        
        let productsDiv = document.createElement("div")
        productsDiv.classList.add("productsDiv")

        productsDiv.style.width = "300px"
        productsDiv.style.height = "400px"
        productsDiv.style.padding = "10px"
        productsDiv.style.borderRadius = "2rem"
        productsDiv.style.display = "flex"
        productsDiv.style.flexDirection = "column"
        productsDiv.style.gap = "1rem"
        productsDiv.style.alignItems = "center"
        productsDiv.style.justifyContent = "center"
        productsDiv.style.boxShadow = " 0 0 10px 0 #888888";
        
        let image = document.createElement("img")
        image.style.width = "150px"
        image.style.height = "150px"
        image.style.cursor = "pointer"
        image.src = product.image

        image.addEventListener('click',()=>{
        
        window.location.href=`product.html?id=${product.id}`
    })

        productsDiv.appendChild(image)

        let title = document.createElement("p")
         title.style.fontWeight = "500"
         title.style.fontSize = "16px"
         title.style.textAlign = "center"
         title.style.cursor = "pointer"
        title.innerText = product.title

         title.addEventListener('click',()=>{
        
        window.location.href=`product.html?id=${product.id}`
    })
        productsDiv.appendChild(title)

       

        let price = document.createElement("p")
        price.style.fontWeight = "bold"
        price.style.margin = "5px 0"
        price.innerText = "$" + product.price
        productsDiv.appendChild(price)

        let ratingDiv = document.createElement("div");
        ratingDiv.style.display = "flex";
        ratingDiv.style.gap = "5px";

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
            count.innerText = `(${product.rating.count})`;
            ratingDiv.appendChild(count);

            productsDiv.appendChild(ratingDiv);


         let button = document.createElement("button")
        button.innerText = "ADD TO CART"
        productsDiv.appendChild(button)

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
    

    // Add Alert
    const alertDiv = document.createElement("div");
    alertDiv.innerText = "Added to cart!";
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
    setTimeout(() => {alertDiv.remove(); }, 2000);

    
    
})

        


        mainContentdiv.appendChild(productsDiv)        
        mainContent.appendChild(mainContentdiv)        

    })



}




async function main() {
    let categories = await getAllCategories()
    let products = await getAllProducts()
    displayProducts(products);

    // calling the sidebar div from html
     sidebar = document.querySelector(".side-bar")

    categories.unshift("ALL")

    categories.forEach((category, index) => {
        let div = document.createElement("div")

        let firstLetter = category.slice(0, 1).toUpperCase()
        

        let remainder = category.slice(1)

        div.innerText = firstLetter + remainder
        div.addEventListener("click", async () => {
            if (category == "ALL") {
                products = await getAllProducts();
                displayProducts(products);
            }
            else {
                products = await getProductsByCategory(category)
                displayProducts(products);
            }
        })




        sidebar.appendChild(div)


    })

    
}

main()



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
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Your data fetching code goes here, e.g., await fetchData();

    } catch (error) {
        console.error("Error loading data:", error);
    } finally {
        hideLoader(); // Hide loader once data is loaded or on error
    }
}

// Call the function to start loading
loadData();



// Select the sidebar and toggle arrow elements

const toggleArrow = document.querySelector("#toggle-arrow");

// Add click event to toggle sidebar open/close state
toggleArrow.addEventListener('click', () => {
    sidebar.classList.toggle('open'); // Toggle open class

    // Adjust main content margin based on sidebar state
    if (sidebar.classList.contains('open')) {
        mainContent.style.marginLeft = '21%'; // Same as sidebar width
    } else {
        mainContent.style.marginLeft = '0';
        
    }

    // Optionally store state in local storage to remember sidebar state
    const isOpen = sidebar.classList.contains('open');
    localStorage.setItem('sidebarOpen', isOpen);

});

// Optional: Restore sidebar state on page load
document.addEventListener('DOMContentLoaded', () => {
    const isOpen = localStorage.getItem('sidebarOpen') === 'true';
    if (isOpen) {
        sidebar.classList.add('open');
         mainContent.style.marginLeft = '21%';
    }
});







