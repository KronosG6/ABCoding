// TODO: Integrar mensajes tipo toast
//! Validar contraseñas
//* Redireccionar a página principal tras registro exitoso
//* Agregar datos del usuario en Firestore
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = registerForm["correo-floating-input"].value;
  const password = registerForm["passwd-floating-input"].value;

  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(`Bienvenido ${userCredentials.user.email}`);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      console.log("Correo ya está en uso");
    } else if (error.code === "auth/invalid-email") {
      console.log("Correo inválido");
    } else if (error.code === "auth/weak-password") {
      console.log("Contraseña demasiado débil");
    } else if (error.code) {
      console.log("Algo salió mal");
    }
  }
});
