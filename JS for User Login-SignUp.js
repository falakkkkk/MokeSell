const API_URL = "https://interactivedev-57b2.restdb.io/rest/account";
const API_KEY = "67a7b4f793d83be95b235226"; // Replace this with your CORS-enabled API Key

// Toggle between login and sign-up
const toggleCircle = document.getElementById("toggleCircle");
const container = document.getElementById("container");

toggleCircle.addEventListener("click", () => {
  container.classList.toggle("signup-active");
});

// SIGN-UP FUNCTION
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const phone = document.getElementById("signupPhone").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  // First, check if the email already exists
  fetch(`${API_URL}?q=${encodeURIComponent(JSON.stringify({ email: email }))}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": API_KEY,
      "Cache-Control": "no-cache",
    },
  })
    .then((response) => response.json())
    .then((users) => {
      if (users.length > 0) {
        alert("Email already registered! Please log in.");
        return;
      }

      // If email is not taken, proceed with account creation
      return fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": API_KEY,
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ name, phone, email, password }),
      });
    })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        alert("Sign up successful! Please log in.");
      }
    })
    .catch((error) => {
      console.error("Sign-up error:", error);
      alert("Sign-up failed! Try again.");
    });
});

// LOGIN FUNCTION
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  // Check if user exists
  fetch(`${API_URL}?q=${encodeURIComponent(JSON.stringify({ email: email }))}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": API_KEY,
      "Cache-Control": "no-cache",
    },
  })
    .then((response) => response.json())
    .then((users) => {
      if (users.length === 0) {
        alert("User not found. Please sign up.");
        return;
      }

      const user = users[0]; // Assuming email is unique

      if (user.password === password) {
        alert("Login successful!");
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "dashboard.html"; // Redirect after login
      } else {
        alert("Incorrect password.");
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      alert("Login failed! Try again.");
    });
});
