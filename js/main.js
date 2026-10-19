import { products } from "./data.js";
import { home, shop, product, adventures, about, contact, login, signup, cartPage, missing } from "./pages.js";

let user = sessionStorage.getItem("user") || "";
let accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("cartCount").textContent = cart.length;
}
























function message(text) {
  document.getElementById("notice").textContent = text;
}

function error(text) {
  document.getElementById("formError").textContent = text;
}

function validEmail(email) {
  return email.includes("@") && email.includes(".");
}

function showPage() {
  let link = document.getElementById("accountLink");
  link.textContent = user ? "Logout" : "Login";
  link.href = user ? "#/home" : "#/login";
  saveCart();

  let hash = location.hash || "#/home";
  let page = hash.split("?")[0].replace("#/", "");
  let id = page.split("/")[1];
  page = page.split("/")[0];
  let app = document.getElementById("app");

  if (page === "home") app.innerHTML = home();
  else if (page === "shop") {
    let category = new URLSearchParams(hash.split("?")[1] || "").get("category");
    app.innerHTML = shop(category);
  }
  else if (page === "product") app.innerHTML = product(id);
  else if (page === "guides") app.innerHTML = adventures();
  else if (page === "about") app.innerHTML = about();
  else if (page === "contact") app.innerHTML = contact();
  else if (page === "login") app.innerHTML = login();
  else if (page === "signup") app.innerHTML = signup();
  else if (page === "cart") app.innerHTML = cartPage(cart);
  else app.innerHTML = missing();

  window.scrollTo(0, 0);
}

document.addEventListener("click", function(e) {
  if (e.target.id === "accountLink" && user) {
    e.preventDefault();
    user = "";
    sessionStorage.removeItem("user");
    location.hash = "#/home";
    message("You logged out.");
    showPage();
  }

  let id = e.target.dataset.add;
  if (id) {
    let p = products.find(item => item.id === id);
    if (p) {
      cart.push(id);
      saveCart();
      message(p.name + " was added to your cart.");
    }
  }

  let removeId = e.target.dataset.remove;
  if (removeId) {
    let index = cart.indexOf(removeId);
    if (index >= 0) cart.splice(index, 1);
    saveCart();
    showPage();
    message("Item removed from cart.");
  }

  if (e.target.id === "checkout") {
    message("Checkout is not set up yet.");
  }
});

document.addEventListener("submit", function(e) {
  e.preventDefault();
  let form = e.target;

  if (form.id === "loginForm") {
    let email = form.elements.email.value.trim().toLowerCase();
    let password = form.elements.password.value;
    let found = accounts.find(a => a.email === email && a.password === password);
    let testAccount = email === "trail@example.com" && password === "trail123";

    if (!validEmail(email) || !password) error("Please enter an email and password.");
    else if (found || testAccount) {
      user = email;
      sessionStorage.setItem("user", email);
      location.hash = "#/home";
      showPage();
      message("You are logged in.");
    } else error("Email or password is incorrect.");
  }

  if (form.id === "signupForm") {
    let first = form.elements.first.value.trim();
    let last = form.elements.last.value.trim();
    let email = form.elements.email.value.trim().toLowerCase();
    let password = form.elements.password.value;
    let confirm = form.elements.confirm.value;

    if (!first || !last || !validEmail(email) || !password || !confirm) {
      error("Fill in all of the boxes.");
    } else if (password.length < 6) {
      error("Password must have at least 6 characters.");
    } else if (password !== confirm) {
      error("Passwords do not match.");
    } else if (accounts.some(a => a.email === email) || email === "trail@example.com") {
      error("That email already has an account.");
    } else {
      accounts.push({ email: email, password: password });
      localStorage.setItem("accounts", JSON.stringify(accounts));
      user = email;
      sessionStorage.setItem("user", email);
      location.hash = "#/home";
      showPage();
      message("Account created. You are logged in.");
    }
  }

  if (form.id === "contactForm") {
    let name = form.elements.name.value.trim();
    let email = form.elements.email.value.trim();
    let subject = form.elements.subject.value;
    let note = form.elements.message.value.trim();

    if (!name || !validEmail(email) || !subject || !note) {
      error("Please complete the form.");
    } else {
      form.reset();
      message("Your message was received.");
      error("Message sent!");
    }
  }
});

window.addEventListener("hashchange", showPage);
showPage();
