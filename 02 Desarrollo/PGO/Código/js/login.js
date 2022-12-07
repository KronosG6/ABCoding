//* Redireccionar a página principal tras registro exitoso
//* Agregar funcionalidad al checkbox (Recuérdame)
//* Agregar funcionalidad al link (Olvidó su contraseña)
import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const loginForm = document.querySelector("#login-form");
const passwdBtn = document.querySelector("#passwd-btn");
const passwdInput = document.querySelector("#passwd-floating-input");

const googleBtn = document.querySelector("#btn-google");

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
    const docRef = doc(db, "usuario", userCredentials.user.uid);
    const docSnap = await getDoc(docRef);
    showToast(`Bienvenido ${docSnap.data().nombre}`);
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

googleBtn.addEventListener("click", async () => {
  const googleProvider = new GoogleAuthProvider();
  try {
    const userCredentials = await signInWithPopup(auth, googleProvider);
    await setDoc(doc(db, "usuario", userCredentials.user.uid), {
      nombre: userCredentials.user.displayName,
    });
    showToast(`Bienvenido ${userCredentials.user.displayName}`);
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      showToast("Operación cancelada");
    } else if (error.code === "auth/account-exists-with-different-credential") {
      showToast("Ya existe una cuenta con este correo");
    } else if (error.code === "auth/cancelled-popup-request") {
      showToast("El navegador impidió abrir un Pop-Up");
    } else if (error.code === "auth/unauthorized-domain") {
      showToast("Dominio no autorizado");
      console.log("Utilizar localhost en lugar de 127.0.0.1");
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

onAuthStateChanged(auth, async (user) => {
  // Comprobar estado de logueo del usuario
});

function showToast(message) {
  const toastMessage = document.getElementById("toast-message");
  const toast = new bootstrap.Toast(document.getElementById("myToast"));
  toastMessage.innerText = message;
  toast.show();
}
