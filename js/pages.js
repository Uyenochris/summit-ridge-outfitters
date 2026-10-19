import { categories, products, guides } from "./data.js";

export function home() {
  let categoryBoxes = "";
  for (let c of categories) {
    categoryBoxes += `<a class="category" href="#/shop?category=${c.name}">
      <img src="assets/${c.photo}" alt="${c.name}"><h3>${c.name}</h3></a>`;
  }

  let productBoxes = "";
  for (let p of products.slice(0, 3)) {
    productBoxes += `<div class="card">
      <a href="#/product/${p.id}"><img src="assets/${p.photo}" alt="${p.name}"></a>
      <h3>${p.name}</h3><p>$${p.price}</p>
      <button data-add="${p.id}">Add to Cart</button></div>`;
  }






  

  return `<section class="hero">
    <div class="content">
      <h1>Where the Trail Begins.</h1>
      <p>Outdoor gear for camping, hiking, and more.</p>
      <a class="button" href="#/shop">Shop Now</a>
    </div></section>
    <section class="content section">
      <h2>Shop by Category</h2><div class="boxes">${categoryBoxes}</div>
    </section>
    <section class="content section">
      <h2>Featured Products</h2><div class="boxes">${productBoxes}</div>
      <p><a href="#/shop">View all products</a></p>
    </section>
    <section class="green"><div class="content">
      <h2>Ready for an Adventure?</h2>
      <p>Check out our guides before your next trip.</p>
      <a class="button orange" href="#/guides">Adventure Guides</a>
    </div></section>`;
}

export function shop(category) {
  let list = products;
  if (category) {
    list = products.filter(p => p.category === category);
  }
  let boxes = "";
  for (let p of list) {
    boxes += `<div class="card">
      <a href="#/product/${p.id}"><img src="assets/${p.photo}" alt="${p.name}"></a>
      <p>${p.category}</p><h3><a href="#/product/${p.id}">${p.name}</a></h3>
      <p>$${p.price}</p><button data-add="${p.id}">Add to Cart</button>
    </div>`;
  }
  let links = `<a href="#/shop">All</a> `;
  for (let c of categories) {
    links += `<a href="#/shop?category=${c.name}">${c.name}</a> `;
  }
  return `<div class="page-hero"><h1>Shop All Gear</h1></div>
    <section class="content section"><p>Find what you need for your next trip.</p>
    <div class="filters">${links}</div>
    <div class="boxes">${boxes || "No products found."}</div></section>`;
}

export function product(id) {
  let p = products.find(item => item.id === id);
  if (!p) return missing();
  return `<section class="content section details">
    <img src="assets/${p.photo}" alt="${p.name}">
    <div><a href="#/shop">Back to Shop</a><h1>${p.name}</h1>
    <p>${p.category} equipment</p><h2>$${p.price}</h2>
    <button data-add="${p.id}">Add to Cart</button></div>
  </section>`;
}

export function adventures() {
  let boxes = "";
  for (let g of guides) {
    boxes += `<div class="card">
      <img src="assets/${g.photo}" alt="${g.name}">
      <h3>${g.name}</h3><p>${g.text}</p>
    </div>`;
  }
  return `<div class="page-hero"><h1>Adventure Guides</h1></div>
    <section class="content section"><h2>Learn From Our Team</h2>
    <p>Here are a few outdoor tips and ideas.</p><div class="boxes">${boxes}</div></section>`;
}

export function about() {
  return `<div class="page-hero"><h1>Our Story</h1></div>
    <section class="content section split">
    <div><h2>Built for the Outdoors</h2>
    <p>Summit Ridge Outfitters opened in Boulder in 1998.</p>
    <p>We sell gear for hiking, camping, fishing, and other outdoor activities.
    Our goal is to help people get outside and have fun.</p></div>
    <img src="assets/about-climber.jpg" alt="Mountain climber">
    </section>
    <section class="content section"><h2>Our Team</h2>
    <div class="boxes team">
      <div class="card"><img src="assets/staff-dana.jpg" alt="Dana"><h3>Dana</h3></div>
      <div class="card"><img src="assets/staff-marcus.jpg" alt="Marcus"><h3>Marcus</h3></div>
      <div class="card"><img src="assets/staff-leila.jpg" alt="Leila"><h3>Leila</h3></div>
    </div></section>`;
}

export function contact() {
  return `<div class="page-hero"><h1>Get in Touch</h1></div>
  <section class="content section"><h2>Contact Us</h2><div class="split">
    <form id="contactForm" novalidate>
      <label>Name<input name="name" placeholder="Your name"></label>
      <label>Email<input name="email" type="email" placeholder="Email address"></label>
      <label>Subject<select name="subject"><option value="">Choose one</option>
      <option>Products</option><option>Orders</option><option>Other</option></select></label>
      <label>Message<textarea name="message" rows="5"></textarea></label>
      <p id="formError" class="error"></p><button>Send Message</button>
    </form>
    <div><h3>Store Information</h3>
    <p>4821 Trailhead Blvd<br>Boulder, Colorado</p>
    <p>(303) 555-0182</p><h3>Hours</h3><p>Monday-Friday: 8am-8pm</p>
    <p>Saturday-Sunday: 9am-6pm</p>
    <img src="assets/store-map.jpg" alt="Store map"></div>
  </div></section>`;
}

export function login() {
  return `<div class="page-hero"><h1>Welcome Back</h1></div>
  <section class="content section form-page">
    <h2>Login</h2><p>Login to your account.</p>
    <form id="loginForm" novalidate>
      <label>Email Address<input name="email" type="email" placeholder="Email"></label>
      <label>Password<input name="password" type="password" placeholder="Password"></label>
      <p id="formError" class="error"></p>
      <button>Login</button>
    </form>
    <p>Don't have an account? <a href="#/signup">Sign Up</a></p>
  </section>`;
}

export function signup() {
  return `<div class="page-hero"><h1>Join Summit Ridge</h1></div>
  <section class="content section form-page">
    <h2>Create an Account</h2><form id="signupForm" novalidate>
      <label>First Name<input name="first" placeholder="First name"></label>
      <label>Last Name<input name="last" placeholder="Last name"></label>
      <label>Email<input name="email" type="email" placeholder="Email"></label>
      <label>Password<input name="password" type="password" placeholder="Password"></label>
      <label>Confirm Password<input name="confirm" type="password" placeholder="Password again"></label>
      <p id="formError" class="error"></p><button>Create Account</button>
    </form><p>Already have an account? <a href="#/login">Login</a></p>
  </section>`;
}

export function cartPage(ids) {
  let html = "";
  let total = 0;
  for (let id of ids) {
    let p = products.find(item => item.id === id);
    if (p) {
      total += p.price;
      html += `<div class="cart-row"><img src="assets/${p.photo}" alt="${p.name}">
        <div><h3>${p.name}</h3><p>$${p.price}</p></div>
        <button data-remove="${p.id}">Remove</button></div>`;
    }
  }
  if (!html) html = `<p>Your cart is empty.</p><p><a href="#/shop">Go to Shop</a></p>`;
  else html += `<h2>Total: $${total}</h2><button id="checkout">Checkout</button>`;
  return `<section class="content section"><h1>Your Cart</h1>${html}</section>`;
}


















export function missing() {
  return `<section class="content section"><h1>Page Not Found</h1>
    <p>There is nothing here.</p><a href="#/home">Home</a></section>`;
}
