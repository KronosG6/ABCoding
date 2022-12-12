import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const btnPerfil = document.getElementById("btnPerfil");
const btnIngresar = document.getElementById("btnIngresar");

window.addEventListener("load", async () => {
  await onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User logged in already or has just logged in.
      btnPerfil.style.display = "block";
    } else {
      // User not logged in or has just logged out.
      btnIngresar.style.display = "block";
      console.log("El usuario no ha iniciado sesión");
    }
  });
});