import { auth, db } from "./firebase.js";
import {
  doc,
  updateDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { uploadFile } from "./storageModule.js";

var userUID;
var url_foto;
const redirectPage = "../html/busqueda.html";
const formRegistro = document.querySelector("#formulario");
const foto = document.querySelector("#fotoPerfil");
const fileInput = document.getElementById("fileInput");

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

fileInput.onchange = async function () {
  foto.src = await uploadFile(fileInput.files[0], "userProfiles/" + userUID);
  url_foto = foto.src;
};

formRegistro.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = formRegistro["nombreInput"].value;
  const telefono = formRegistro["telefonoInput"].value;
  const localidad = formRegistro["localidadInput"].value;
  try {
    await updateDoc(doc(db, "usuario", userUID), {
      nombre,
      telefono,
      localidad,
      url_foto,
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
  formRegistro["fileInput"].value = "";
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
  }
  const docRef = doc(db, "usuario", userUID);
  const docSnap = await getDoc(docRef);
  if (docSnap.data().nombre) {
    formRegistro["nombreInput"].value = docSnap.data().nombre;
  } else {
    formRegistro["nombreInput"].value = "";
  }
  url_foto = docSnap.data().url_foto;
  if (url_foto != "default") {
    foto.src = docSnap.data().url_foto;
  } else {
    foto.src = "../img/user-circle.svg";
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
