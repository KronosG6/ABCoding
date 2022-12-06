// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// SDK's agregados - CDN de Firebase
// Autenticación
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMxOYTKtj2Dg8bUiJXdqQRrrIpu-4-65M",
  authDomain: "profe-go.firebaseapp.com",
  projectId: "profe-go",
  storageBucket: "profe-go.appspot.com",
  messagingSenderId: "612714822034",
  appId: "1:612714822034:web:2398c2b4cf990838b1a94b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
