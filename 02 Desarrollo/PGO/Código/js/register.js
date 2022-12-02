//* Implementar 2 tipos de mensajes: {error, success}
//* Redireccionar a página principal tras registro exitoso
import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const registerForm = document.querySelector("#register-form");
const passwdBtn = document.querySelector("#passwd-btn");
const passwdInput = document.querySelector("#passwd-floating-input");
const repPasswdBtn = document.querySelector("#rep-passwd-btn");
const repPasswdInput = document.querySelector("#rep-passwd-floating-input");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = registerForm["nombre-floating-input"].value;
  const email = registerForm["correo-floating-input"].value;
  const password = registerForm["passwd-floating-input"].value;
  const repPassword = registerForm["rep-passwd-floating-input"].value;

  try {
    // también se puede validar seguridad de la contraseña
    if (password !== repPassword) {
      throw "diffPasswd";
    }

    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const docRef = await setDoc(doc(db, "usuario", userCredentials.user.uid), {
      nombre: name,
    });
    showToast(`Bienvenido ${name}`);
  } catch (error) {
    if (error === "diffPasswd") {
      showToast("Las contraseñas deben ser iguales");
    } else if (error.code === "auth/email-already-in-use") {
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

passwdBtn.addEventListener("mousedown", () => {
  passwdInput.type = "text";
  passwdBtn.firstElementChild.innerText = "visibility";
});

passwdBtn.addEventListener("mouseup", () => {
  passwdInput.type = "password";
  passwdBtn.firstElementChild.innerText = "visibility_off";
});

repPasswdBtn.addEventListener("mousedown", () => {
  repPasswdInput.type = "text";
  repPasswdBtn.firstElementChild.innerText = "visibility";
});

repPasswdBtn.addEventListener("mouseup", () => {
  repPasswdInput.type = "password";
  repPasswdBtn.firstElementChild.innerText = "visibility_off";
});

function showToast(message) {
  const toastMessage = document.getElementById("toast-message");
  const toast = new bootstrap.Toast(document.getElementById("myToast"));
  toastMessage.innerText = message;
  toast.show();
}
