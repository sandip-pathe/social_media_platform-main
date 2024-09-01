import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { firebaseConfig } from "./config.js";

// Sidebar
const menuItems = document.querySelectorAll(".menu-item");

// Messages
const messageNotification = document.querySelector("#messages-notifications");
const messages = document.querySelector(".messages");
const message = messages.querySelectorAll(".message");
const messageSearch = document.querySelector("#message-search");

//Theme
const theme = document.querySelector("#theme");
const themeModal = document.querySelector(".customize-theme");
const fontSize = document.querySelectorAll(".choose-size span");
var root = document.querySelector(":root");
const colorPalette = document.querySelectorAll(".choose-color span");
const Bg1 = document.querySelector(".bg-1");
const Bg2 = document.querySelector(".bg-2");
const Bg3 = document.querySelector(".bg-3");

// ============== SIDEBAR ==============

// Remove active class from all menu items
const changeActiveItem = () => {
  menuItems.forEach((item) => {
    item.classList.remove("active");
  });
};

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    changeActiveItem();
    item.classList.add("active");
    if (item.id != "notifications") {
      document.querySelector(".notifications-popup").style.display = "none";
    } else {
      document.querySelector(".notifications-popup").style.display = "block";
      document.querySelector(
        "#notifications .notification-count"
      ).style.display = "none";
    }
  });
});

// ============== MESSAGES ==============

//Searches messages
const searchMessage = () => {
  const val = messageSearch.value.toLowerCase();
  message.forEach((user) => {
    let name = user.querySelector("h5").textContent.toLowerCase();
    if (name.indexOf(val) != -1) {
      user.style.display = "flex";
    } else {
      user.style.display = "none";
    }
  });
};

//Search for messages
messageSearch.addEventListener("keyup", searchMessage);

//Highlight messages card when messages menu item is clicked
messageNotification.addEventListener("click", () => {
  messages.style.boxShadow = "0 0 1rem var(--color-primary)";
  messageNotification.querySelector(".notification-count").style.display =
    "none";
  setTimeout(() => {
    messages.style.boxShadow = "none";
  }, 2000);
});

// ============== THEME / DISPLAY CUSTOMIZATION ==============

// Opens Modal
const openThemeModal = () => {
  themeModal.style.display = "grid";
};

// Closes Modal
const closeThemeModal = (e) => {
  if (e.target.classList.contains("customize-theme")) {
    themeModal.style.display = "none";
  }
};

themeModal.addEventListener("click", closeThemeModal);
theme.addEventListener("click", openThemeModal);

// ============== FONT SIZE ==============

// remove active class from spans or font size selectors
const removeSizeSelectors = () => {
  fontSize.forEach((size) => {
    size.classList.remove("active");
  });
};

fontSize.forEach((size) => {
  size.addEventListener("click", () => {
    removeSizeSelectors();
    let fontSize;
    size.classList.toggle("active");

    if (size.classList.contains("font-size-1")) {
      fontSize = "10px";
      root.style.setProperty("----sticky-top-left", "5.4rem");
      root.style.setProperty("----sticky-top-right", "5.4rem");
    } else if (size.classList.contains("font-size-2")) {
      fontSize = "13px";
      root.style.setProperty("----sticky-top-left", "5.4rem");
      root.style.setProperty("----sticky-top-right", "-7rem");
    } else if (size.classList.contains("font-size-3")) {
      fontSize = "16px";
      root.style.setProperty("----sticky-top-left", "-2rem");
      root.style.setProperty("----sticky-top-right", "-17rem");
    } else if (size.classList.contains("font-size-4")) {
      fontSize = "19px";
      root.style.setProperty("----sticky-top-left", "-5rem");
      root.style.setProperty("----sticky-top-right", "-25rem");
    } else if (size.classList.contains("font-size-5")) {
      fontSize = "22px";
      root.style.setProperty("----sticky-top-left", "-12rem");
      root.style.setProperty("----sticky-top-right", "-35rem");
    }

    // change font size of the root html element
    document.querySelector("html").style.fontSize = fontSize;
  });
});

// Remove active class from colors
const changeActiveColorClass = () => {
  colorPalette.forEach((colorPicker) => {
    colorPicker.classList.remove("active");
  });
};

// Change color primary
colorPalette.forEach((color) => {
  color.addEventListener("click", () => {
    let primary;
    changeActiveColorClass();

    if (color.classList.contains("color-1")) {
      primaryHue = 252;
    } else if (color.classList.contains("color-2")) {
      primaryHue = 52;
    } else if (color.classList.contains("color-3")) {
      primaryHue = 352;
    } else if (color.classList.contains("color-4")) {
      primaryHue = 152;
    } else if (color.classList.contains("color-5")) {
      primaryHue = 202;
    }

    color.classList.add("active");
    root.style.setProperty("--primary-color-hue", primaryHue);
  });
});

//Theme Background Values
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// Changes background color
const changeBG = () => {
  root.style.setProperty("--light-color-lightness", lightColorLightness);
  root.style.setProperty("--white-color-lightness", whiteColorLightness);
  root.style.setProperty("--dark-color-lightness", darkColorLightness);
};

Bg1.addEventListener("click", () => {
  // add active class
  Bg1.classList.add("active");
  // remove active class from the others
  Bg2.classList.remove("active");
  Bg3.classList.remove("active");
  //remove customized changes from local storage
  window.location.reload();
});

Bg2.addEventListener("click", () => {
  darkColorLightness = "95%";
  whiteColorLightness = "20%";
  lightColorLightness = "15%";

  // add active class
  Bg2.classList.add("active");
  // remove active class from the others
  Bg1.classList.remove("active");
  Bg3.classList.remove("active");
  changeBG();
});

Bg3.addEventListener("click", () => {
  darkColorLightness = "95%";
  whiteColorLightness = "10%";
  lightColorLightness = "0%";

  // add active class
  Bg3.classList.add("active");
  // remove active class from the others
  Bg1.classList.remove("active");
  Bg2.classList.remove("active");
  changeBG();
});

// ============== AUTHENTICATION ==============

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Your web app's Firebase configuration

// Select modal elements
const authModal = document.querySelector("#auth-modal");
const authSubmit = document.querySelector("#auth-submit");
const toggleAuth = document.querySelector("#toggle-auth");
const authTitle = document.querySelector("#auth-title");
const authMessage = document.querySelector("#auth-message");
const logoutButton = document.querySelector("#logout-button");

// Open authentication modal
const openAuthModal = () => {
  authModal.style.display = "block";
};

// Close authentication modal
const closeAuthModal = () => {
  authModal.style.display = "none";
};

// Handle authentication
const handleAuth = () => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const isLogin = authTitle.textContent === "Login";

  if (isLogin) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authMessage.textContent = "Login successful!";
        setTimeout(() => closeAuthModal(), 20);
      })
      .catch((error) => {
        authMessage.textContent = `Error: ${error.message}`;
      });
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authMessage.textContent = "Registration successful!";
        setTimeout(() => closeAuthModal(), 20);
      })
      .catch((error) => {
        authMessage.textContent = `Error: ${error.message}`;
      });
  }
};

// Toggle between login and registration
const toggleAuthMode = () => {
  if (authTitle.textContent === "Login") {
    authTitle.textContent = "Register";
    toggleAuth.textContent = "Login";
    authSubmit.textContent = "Register";
  } else {
    authTitle.textContent = "Login";
    toggleAuth.textContent = "Register";
    authSubmit.textContent = "Login";
  }
};

// Handle logout
const handleLogout = () => {
  signOut(auth)
    .then(() => {
      authMessage.textContent = "Logout successful!";
      setTimeout(() => {
        authMessage.textContent = "";
        openAuthModal();
      }, 2000);
    })
    .catch((error) => {
      authMessage.textContent = `Error: ${error.message}`;
    });
};

// Event listeners
authSubmit.addEventListener("click", handleAuth);
toggleAuth.addEventListener("click", toggleAuthMode);
logoutButton.addEventListener("click", handleLogout);

// Check user authentication state
const checkAuthState = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is signed in:", user);
      authModal.style.display = "none"; // Hide modal if user is signed in
      logoutButton.style.display = "block"; // Show logout button
    } else {
      console.log("User is signed out");
      openAuthModal(); // Open modal if user is not signed in
      logoutButton.style.display = "none"; // Hide logout button
    }
  });
};

// Call the function to check auth state when the page loads
checkAuthState();
