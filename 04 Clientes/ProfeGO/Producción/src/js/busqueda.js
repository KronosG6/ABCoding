import { auth, db } from "./firebase.js";
import {
  doc,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  query,
  where,
  collection,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

var logged;
var userUID;
const catalogo = document.getElementById("contenedorCatalogo");
const btnPerfil = document.getElementById("btnPerfil");
const btnChat = document.getElementById("btnChat");
const btnIngresar = document.getElementById("btnIngresar");

window.addEventListener("load", async () => {
  await onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User logged in already or has just logged in.
      userUID = user.uid;
      logged = true;
      btnChat.style.display = "block";
      btnPerfil.style.display = "block";
    } else {
      // User not logged in or has just logged out.
      logged = false;
      btnIngresar.style.display = "block";
      console.log("El usuario no ha iniciado sesión");
    }
  });
  await getProfesores();
});

async function getProfesores() {
  try {
    const consulta = query(
      collection(db, "usuario"),
      where("tipo", "==", "profesor")
    );
    const querySnapshot = await getDocs(consulta);
    querySnapshot.forEach((doc) => {
      if (doc.id != userUID) {
        crearHTMLProfesor(doc.id, doc.data());
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}

function crearHTMLProfesor(id, profesorObj) {
  try {
    const itemHTML = `
      <div class="box">
        <div class="img">
          <img src="${
            profesorObj.url_foto === "default"
              ? "../img/user-circle.svg"
              : profesorObj.url_foto
          }" alt="" />
        </div>
        <div class="colum1">
          <h2>${profesorObj.nombre}</h2>
          <p>${profesorObj.localidad}</p>
          <p>${profesorObj.materia}</p>
          <p>
            ${profesorObj.descripcion}
          </p>
        </div>
        <div class="colum2">
          <h2>S/${profesorObj.precio} por hora</h2>
          <p>${profesorObj.promocion}</p>
          <div class="estrellas">
            <input type="radio" id="star1" name="rate" value="star1" />
            <label for="star1"></label>
            <input type="radio" id="star2" name="rate" value="star2" />
            <label for="star2"></label>
            <input type="radio" id="star3" name="rate" value="star3" />
            <label for="star3"></label>
            <input type="radio" id="star4" name="rate" value="star4" />
            <label for="star4"></label>
            <input type="radio" id="star5" name="rate" value="star5" />
            <label for="star5"></label>
          </div>
          <button id="${id}" type="button" class="boton-contactar">Contactar</button>
        </div>
      </div>
    `;
    catalogo.innerHTML += itemHTML;

    // Si el usuario está loggeado,
    // se agrega un listener onclick para cada boton contactar
    if (logged) {
      const listaBotones = document.querySelectorAll(".boton-contactar");
      listaBotones.forEach((item) => {
        item.addEventListener("click", async function () {
          const conexion = await getDoc(
            doc(db, `usuario/${userUID}/conexion/${item.id}`)
          );
          if (conexion.data() == undefined) {
            const newChat = await addDoc(collection(db, "chat"), {
              iniciado_por: userUID,
            });
            await setDoc(doc(db, `usuario/${userUID}/conexion`, item.id), {
              id_chat: newChat.id,
            });
            await setDoc(doc(db, `usuario/${item.id}/conexion`, userUID), {
              id_chat: newChat.id,
            });
          }
          window.location.href = "../html/contactos.html";
        });
      });
    } else {
      const listaBotones = document.querySelectorAll(".boton-contactar");
      listaBotones.forEach((item) => {
        item.addEventListener("click", async function () {
          window.location.href = "../html/login.html";
        });
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function checkConexion(idContacto) {
  try {
    const conexion = await getDoc(
      doc(db, `usuario/${userUID}/conexion/${idContacto}`)
    );
    return conexion.data() != undefined;
  } catch (error) {
    console.log(error.message);
  }
}

function createConexion(idContacto) {}
