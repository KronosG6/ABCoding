import { auth, db } from "./firebase.js";
import {
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

var userUID;
const redirectPage = "../html/contactos.html";
const formRegistro = document.querySelector("#formulario");

window.addEventListener("load", async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User logged in already or has just logged in.
      userUID = user.uid;
      await showDatosUsuario();
    } else {
      // User not logged in or has just logged out.
      console.log("El usuario no ha iniciado sesión");
      // Se redirige a al login
      window.location.href = "../html/login.html";
    }
  });
});

formRegistro.addEventListener("submit", async (e) => {
  e.preventDefault();

  const tipoClase = formRegistro["tipo-clase"].value;
  const materia = formRegistro["materiaInput"].value;
  const precio = formRegistro["precioInput"].value;
  const descripcion = formRegistro["descripcionInput"].value;
  const nombre = formRegistro["nombreInput"].value;
  const telefono = formRegistro["telefonoInput"].value;
  const localidad = formRegistro["localidadInput"].value;

  try {
    await setDoc(doc(db, "usuario", userUID), {
      nombre,
      descripcion,
      telefono,
      tipoClase,
      materia,
      precio,
      localidad,
    });
    // Se redirige a otra página
    setTimeout(() => {
      window.location.href = redirectPage;
    }, "1500");
  } catch (error) {
    console.log(error.message);
  }
});

async function showDatosUsuario() {
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
  }
  const docRef = doc(db, "usuario", userUID);
  const docSnap = await getDoc(docRef);
  // showToast(`Bienvenido ${docSnap.data().nombre}`);
  if (docSnap.data().nombre) {
    formRegistro["nombreInput"].value = docSnap.data().nombre;
  } else {
    formRegistro["nombreInput"].value = "";
  }
  if (docSnap.data().tipoClase) {
    formRegistro["tipo-clase"].value = docSnap.data().tipoClase;
  } else {
    formRegistro["tipo-clase"][0].checked = false;
    formRegistro["tipo-clase"][1].checked = false;
  }
  if (docSnap.data().materia) {
    formRegistro["materiaInput"].value = docSnap.data().materia;
  } else {
    formRegistro["materiaInput"].value = "";
  }
  if (docSnap.data().precio) {
    formRegistro["precioInput"].value = docSnap.data().precio;
  } else {
    formRegistro["precioInput"].value = "";
  }
  if (docSnap.data().descripcion) {
    formRegistro["descripcionInput"].value = docSnap.data().descripcion;
  } else {
    formRegistro["descripcionInput"].value = "";
  }
  if (docSnap.data().telefono) {
    formRegistro["telefonoInput"].value = docSnap.data().telefono;
  } else {
    formRegistro["telefonoInput"].value = "";
  }
  if (docSnap.data().localidad) {
    formRegistro["localidadInput"].value = docSnap.data().localidad;
  } else {
    formRegistro["localidadInput"].value = "";
  }
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = false;
  }
}
