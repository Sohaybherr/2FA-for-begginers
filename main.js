class service{
    constructor(serviceName, serviceType, serviceimg, serviceDescription, servicePrice){
        this.serviceName = serviceName;
        this.serviceType = serviceType;
        this.serviceimg = serviceimg;
        this.serviceDescription = serviceDescription;
        this.servicePrice = servicePrice;
    }
}
class Client{
    constructor(clientName, clientEmail, clientPhone){
        this.clientName = clientName;
        this.clientEmail = clientEmail;
        this.clientPhone = clientPhone;
    }
}
let cart = [];
    let services = [
        new service(
  "Web Development",
  "Development",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
  "Build responsive websites.",
  500
),
new service(
  "Graphic Design",
  "Design",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
  "Create stunning graphics.",
  300
),
new service(
  "SEO Optimization",
  "Marketing",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  "Improve your website's visibility.",
  200
)
    ];
window.onload = function() {
  
    mainpage();
}
function mainpage(){

let xx=`<header class="header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="test.html">Service List</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                    <li class="nav-item dropdown" id="cart-dropdown">
                        <button class="nav-link" type="button" onclick="showCart()" aria-expanded="false">
                            <i class="bi bi-cart"></i>Cart
                        </button></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container mt-4">
        <h1 class="text-center">Welcome to Our Service List</h1>
        <p class="text-center">Explore our range of services below.</p>
    </div>
</div>
</header>`
services.forEach((service,index) => {
    xx += `
    <div class="card mb-4">
        <img src="${service.serviceimg}" class="img-fluid rounded mb-3" 
     style="max-width: 300px; height: auto;"alt="${service.serviceName}">
        <div class="card-body">
            <h5 class="card-title">${service.serviceName}</h5>
            <p class="card-text">${service.serviceDescription}</p>
            <p class="card-text"><strong>Price: $${service.servicePrice}</strong></p>
            <button class="btn btn-primary" onclick="addToCart(${index})">Add to Cart</button>
        </div>
    </div>`;
});
xx += `
<div class="container">
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" class="form-control mb-3" placeholder="Enter your email">
  
  <label for="phone">Phone:</label>
  <input type="tel" id="phone" name="phone" class="form-control mb-3" placeholder="Enter your phone number">

  <div class="text-center mt-3">
    <button class="btn btn-danger" onclick="checkout()">Checkout</button>
  </div>
</div>
 
`;
document.body.innerHTML = xx;}
function addToCart(index) {
    const service = services[index];
  if(cart.some(item => item.serviceName === service.serviceName)) {
        alert("This service is already in your cart.");
        return;
    }
    cart.push(service);
    carticon= document.getElementById('cart-dropdown');
    carticon.innerHTML =`<li class="nav-item dropdown" id="cart-dropdown">
    <button class="nav-link position-relative" type="button" onclick="showCart()">
        <i class="bi bi-cart"></i>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cart-count">
        ${cart.length}
        </span>
        Cart
    </button>
</li>`;
}
function showCart() {
    let totalPrice = cart.reduce((total, item) => total + item.servicePrice, 0);
    if(cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    let YY= `<h2>Your Cart</h2>`;
    YY += `<ul class="list-group mb-4">`;
    cart.forEach((item) => {

        YY += `<li class="list-group-item d-flex justify-content-between align-items-center">
            ${item.serviceName} - $${item.servicePrice}
            <button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.serviceName}')">Remove</button>
        </li>`;
    });
    YY += `</ul>`;
    YY += `<h3>Total Price: $${totalPrice}</h3>`;
    YY += `<button class="btn btn-secondary" onclick="mainpage()">Continue Shopping</button>`;
    YY += `<button class="btn btn-success" onclick="ToCheckout()">Checkout</button>`;
    document.body.innerHTML = YY;
}
function removeFromCart(serviceName) {
    cart = cart.filter(item => item.serviceName !== serviceName);
    if(cart.length === 0) {
        mainpage();
        return;
    }
    showCart();
}
function ToCheckout() {
    let checkoutPage = `<h2>Checkout</h2>`;
    checkoutPage += `<p>Please confirm your details before proceeding.</p>`;
    checkoutPage += `<label for="email">Email:</label>`;
    checkoutPage += `<input type="email" id="email" name="email" class="form-control mb-3" placeholder="Enter your email">`;
    checkoutPage += `<label for="phone">Phone:</label>`;
    checkoutPage += `<input type="tel" id="phone" name="phone" class="form-control mb-3" placeholder="Enter your phone number">`;
    checkoutPage += `<button class="btn btn-primary" onclick="checkout()">Confirm Purchase</
button>`;
    checkoutPage += `<button class="btn btn-secondary" onclick="mainpage()">Cancel</button>`;
    checkoutPage += `<p class="text-danger">Please fill in all fields to proceed.</p>`;
    document.body.innerHTML = checkoutPage;
}
function checkout() {
    const email = document.getElementById('email').value|| '';
    const phone = document.getElementById('phone').value|| '';
    if(!email || !phone|| email.trim() === '' || phone.trim() === '') {
        let xx=`<h2>VERIFY YOUR DETAILS</h2>`;
        xx += `<p>Please enter your email and phone number to proceed with the checkout.</p>`;
        xx += `<label for="email">Email:</label>`;
        xx += `<input type="email" id="email" name="email" class="form-control mb-3" placeholder="Enter your email">`;
        xx += `<label for="phone">Phone:</label>`;
        xx += `<input type="tel" id="phone" name="phone" class="form-control mb-3" placeholder="Enter your phone number">`;
        xx += `<button class="btn btn-primary" onclick="checkout()">Confirm Purchase</button>`;
        xx += `<button class="btn btn-secondary" onclick="mainpage()">Cancel</button>`;
        xx += `<p class="text-danger">Please fill in all fields to proceed.</p>`;
        document.body.innerHTML = xx;
        return;
    }
    verification(email);
    
};
function verification(email) {
    let codeis = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit code
    fetch('http://127.0.0.1:5000/send-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, code: codeis })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert("Verification email sent!");
        } else {
            alert("Error sending verification email.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
    let xx=`<p>Enter the verification code sent to your email:</p>`;
    xx += `<input type="text" id="verification-code" class="form-control mb-3" placeholder="Enter verification code">`;
    xx += `<button class="btn btn-primary" onclick="verifyCode(${codeis},'${email}')">Verify Code</button>`;
    document.body.innerHTML = xx;
   return codeis; // Return the generated code for verification
}
function verifyCode(codeis,email) {
    const enteredCode = document.getElementById('verification-code').value;
    if(enteredCode === codeis.toString()) {
        let cart1 = cart;
        cart = []; // Clear the cart after successful verification
        let xx=`<h2>Verification Successful</h2>`;
        xx += `<p>Your email has been verified successfully.</p>`;
        xx+=`<p>your purchase has been confirmed.</p>`;
        xx += `<p>Thank you for your order!</p>`;
        xx += `<button class="btn btn-success" onclick="mainpage()">Proceed to Main Page</button>`;
        xx += `<button class="btn btn-secondary" onclick="checkout()">Go Back to Checkout</button>`;
        document.body.innerHTML = xx;
        sendconfirmationEmail(email, cart1);
    } else {
        alert("Incorrect verification code. Please try again.");
        return false; // Verification failed
    }
}
function sendconfirmationEmail(email,cart) {
    fetch('http://localhost:5000/confirmation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, cart: cart })
    })
    .then(response => response.json())
        .then(data => {
        if(data.success) {
           return true; // Email sent successfully
        } else {
            return false; // Email sending failed
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}