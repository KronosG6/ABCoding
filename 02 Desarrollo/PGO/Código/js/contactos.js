import { auth, db } from "./firebase.js";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

var userUID;
var unsuscribe;
var activeChat = "";
const contenedorContactos = document.getElementById("contactos");
const contenedorMensajes = document.getElementById("bodyContent");
const contactoSeleccionado = document.getElementById("selected-contact");
const botonEnviar = document.getElementById("submit");
const mensajeTextArea = document.getElementById("message");

window.addEventListener("load", async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User logged in already or has just logged in.
      userUID = user.uid;
      await getContactos(user.uid);
    } else {
      // User not logged in or has just logged out.
      console.log("El usuario no ha iniciado sesión");
    }
  });
});

botonEnviar.addEventListener("click", async () => {
  const tiempo = new Date();
  await setDoc(doc(db, `chat/${activeChat}/mensajes`, tiempo.toISOString()), {
    mensaje: mensajeTextArea.value,
    creado_por: userUID
  });
});

/**
 * Obtiene los contactos del usuario
 *
 * @param {String} userId - el del usuario
 */
async function getContactos(userId) {
  try {
    const conexiones = await getDocs(
      collection(db, `usuario/${userId}/conexion`)
    );
    conexiones.forEach(async (contacto) => {
      await createHTMLContacto(contacto.id, contacto.data().id_chat);
    });
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * Obtiene los mensajes de la base de datos y luego los muestra en la pantalla.
 * @param {String} idChat - la identificación del chat
 */
async function getMensajes(idChat, nombreChat, urlFoto) {
  try {
    const activeChatDiv = `
      <div class="avatar">
        <img src="${
          urlFoto === "default" ? "../img/user-circle.svg" : urlFoto
        }" alt="perfil">
      </div>
      <div class="info-user-selected">
        <span class="name-user">${nombreChat}</span>
      </div>
    `;
    contactoSeleccionado.innerHTML = activeChatDiv;
    unsuscribe = onSnapshot(
      collection(db, `chat/${idChat}/mensajes`),
      (snapshot) => {
        contenedorMensajes.innerHTML = "";
        snapshot.docs.forEach(async (msg) => {
          showMensaje(msg.data().mensaje, msg.data().creado_por == userUID);
        });
      },
      (error) => {
        console.log(error.message);
      }
    );
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * Muestra información del contacto
 *
 * @param {String} idContacto - el id del usuario que desea mostrar
 */
async function createHTMLContacto(idContacto, idChat) {
  try {
    const docRef = doc(db, "usuario", idContacto);
    const docSnap = await getDoc(docRef);
    const nombre = docSnap.data().nombre;
    const urlFoto = docSnap.data().url_foto;
    const contactDiv = `
        <div id="${idChat}" class="user">
            <div class="avatar">
            <img src="${
              urlFoto === "default" ? "../img/user-circle.svg" : urlFoto
            }" alt="perfil">
            </div>
            <div class="info-user">
                <span class="name-user">${nombre}</span>
            </div>
        </div>
    `;
    contenedorContactos.innerHTML += contactDiv;

    // Se agrega un listener onclick para cada contacto
    const listaContactos = document.querySelectorAll(".user");
    listaContactos.forEach((item) => {
      item.addEventListener("click", async function () {
        activeChat = item.id;
        await getMensajes(
          item.id,
          item.querySelector("span").innerText,
          item.querySelector("img").src
        );
      });
    });
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * Muestra un mensaje segun el emisor
 *
 * @param {String} mensaje - el mensaje a mostrar
 * @param {Boolean} tipo - true, para el usuario actual | false, para el otro
 */
function showMensaje(mensaje, tipo) {
  if (tipo) {
    const boxDiv = `
        <div class="box-right">
            <div class="space"></div>
            <div class="message m-right">
                <p>${mensaje}</p>
            </div>
        </div>
    `;
    contenedorMensajes.innerHTML += boxDiv;
  } else {
    const boxDiv = `
        <div class="box-left">
            <div class="message m-left">
                <p>${mensaje}</p>
            </div>
            <div class="space"></div>
        </div>
    `;
    contenedorMensajes.innerHTML += boxDiv;
  }
}
