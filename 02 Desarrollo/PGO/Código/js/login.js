//* Redireccionar a página principal tras registro exitoso
//* Agregar funcionalidad al checkbox (Recuérdame)
//* Agregar funcionalidad al link (Olvidó su contraseña)
import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm["correo-floating-input"].value;
  const password = loginForm["passwd-floating-input"].value;

  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    showToast(`Bienvenido ${userCredentials.user.email}`);
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      showToast("Correo no encontrado");
    } else if (error.code === "auth/wrong-password") {
      showToast("Contraseña incorrecta");
    } else if (error.code) {
      showToast("Algo salió mal");
    }
  }
});

onAuthStateChanged(auth, async (user) => {
  // Comprobar estado de logueo del usuario
});

function showToast(message) {
  const toastMessage = document.getElementById("toast-message");
  const toast = new bootstrap.Toast(document.getElementById("myToast"));
  toastMessage.innerText = message;
  toast.show();
}