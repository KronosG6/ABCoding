//* Implementar 2 tipos de mensajes: {error, success}
//* Redireccionar a página principal tras registro exitoso
import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const registerForm = document.querySelector("#register-form");
const passwdBtn = document.querySelector("#passwd-btn");
const passwdInput = document.querySelector("#passwd-floating-input");
const repPasswdBtn = document.querySelector("#rep-passwd-btn");
const repPasswdInput = document.querySelector("#rep-passwd-floating-input");

const googleBtn = document.querySelector("#btn-google");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = registerForm["nombre-floating-input"].value;
  const email = registerForm["correo-floating-input"].value;
  const password = registerForm["passwd-floating-input"].value;
  const repPassword = registerForm["rep-passwd-floating-input"].value;
  try {
    // también se puede validar seguridad de la contraseña
    if (password !== repPassword) {
      throw { code: "diffPasswd" };
    }
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "usuario", userCredentials.user.uid), {
      nombre: name,
    });
    showToast(`Bienvenido ${name}`);
  } catch (error) {
    switch (error.code) {
      case "diffPasswd":
        showToast("Las contraseñas deben ser iguales");
        break;
      case "auth/email-already-in-use":
        showToast("Correo ya está en uso");
        break;
      case "auth/invalid-email":
        showToast("Correo inválido");
        break;
      case "auth/weak-password":
        showToast("Contraseña demasiado débil");
        break;
      default:
        showToast("Algo salió mal");
        break;
    }
  }
});

googleBtn.addEventListener("click", async () => {
  const googleProvider = new GoogleAuthProvider();
  try {
    const userCredentials = await signInWithPopup(auth, googleProvider);
    await setDoc(doc(db, "usuario", userCredentials.user.uid), {
      nombre: userCredentials.user.displayName,
    });
    showToast(`Bienvenido ${userCredentials.user.displayName}`);
  } catch (error) {
    switch (error.code) {
      case "auth/popup-closed-by-user":
        showToast("Operación cancelada");
        break;
      case "auth/account-exists-with-different-credential":
        showToast("Ya existe una cuenta con este correo");
        break;
      case "auth/cancelled-popup-request":
        showToast("El navegador impidió abrir un Pop-Up");
        break;
      case "auth/unauthorized-domain":
        showToast("Dominio no autorizado");
        console.log("Utilizar localhost en lugar de 127.0.0.1");
        break;
      default:
        showToast("Algo salió mal");
        break;
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
