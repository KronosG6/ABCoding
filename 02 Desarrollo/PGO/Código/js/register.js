//! Validar contraseñas
//* Redireccionar a página principal tras registro exitoso
import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = registerForm["nombre-floating-input"].value;
  const email = registerForm["correo-floating-input"].value;
  const password = registerForm["passwd-floating-input"].value;

  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const docRef = await setDoc(doc(db, "usuario", userCredentials.user.uid), {
      nombre: name
    });
    showToast(`Bienvenido ${name}`);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      showToast("Correo ya está en uso");
    } else if (error.code === "auth/invalid-email") {
      showToast("Correo inválido");
    } else if (error.code === "auth/weak-password") {
      showToast("Contraseña demasiado débil");
    } else if (error.code) {
      showToast("Algo salió mal");
    }
  }
});

function showToast(message) {
  const toastMessage = document.getElementById("toast-message");
  const toast = new bootstrap.Toast(document.getElementById("myToast"));
  toastMessage.innerText = message;
  toast.show();
}