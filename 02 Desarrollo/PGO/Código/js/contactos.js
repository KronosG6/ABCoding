import { auth, db } from "./firebase.js";
import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User logged in already or has just logged in.
        const usuarioActual = user.uid;
        getContactos(usuarioActual);
    } else {
        // User not logged in or has just logged out.
        console.log('Usuario no ha iniciado sesión');
    }
});

/*
import { database } from "./firebase.js";
import { ref, set, child, push} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";


//send message
submit.addEventListener('click', (e) => {
    var message = document.getElementById('message').value;
    var name = 'user1';

    const id = push(child(ref(database), 'messages')).key;
    set(ref(database, 'messages/' + id), {
        name: name,
        message: message

    });
    document.getElementById('message').value = '';
    alert('Mensaje enviado');

});

*/
// recibir mensajes


/*

const newMsg = ref(database, 'messages/');
onChilAdded(newMsg, (data) => {
    if(data.val().name != 'user'){
        var divData =  '<div class="box-right">\n' +
        '<div class="space"></div>\n' +
       ' <div class="message m-right">\n' +
        '  <p>hola mundo</p>\n' +
        '' +data.val().message+'' +
         ' <span>12:00</span>\n' +
        '</div>\n' +
     '</div>';
     var d1 = document.getElementById('bodyContent');
        d1.insertAdjacentHTML('beforeend', divData);
    }else{
        var divData =  '<div class="box-right">\n' +
        '<div class="space"></div>\n' +
       ' <div class="message m-left">\n' +
        '  <p>hola mundo</p>\n' +
        '' +data.val().message+'' +
         ' <span>12:00</span>\n' +
        '</div>\n' +
     '</div>';
     var d1 = document.getElementById('bodyContent');
        d1.insertAdjacentHTML('beforeend', divData);

    }

});

*/

/*
function addContact(fullName){
    if(!fullName || fullName.trim()) return;

    const contactDiv = document.createElement('div');
    contactDiv.className = 'user';

}*/

const contenedorContactos = document.getElementById('contactos');

// console.log(contenedorContactos);


async function getContactos(userId) {
    // const docRef = doc(db, "usuario", user);
    // const docSnap = await getDoc(docRef);
    // showToast(`Bienvenido ${docSnap.data().nombre}`);
    const conexiones = await getDocs(collection(db, `usuario/${userId}/conexion`));
    conexiones.forEach(async (contacto) => {
        await showContacto(contacto.id);
        // uGJHyn2kByfNaQO35b6dlcgCi6p2
        // W6wn5p9jD8Qi9g4nsgrvmC6qF863
        // W6wn5p9jD8Qi9g4nsgrvmC6qF863
    });
    console.log("hecho");
}

async function showContacto(idContacto) {
    
    try {
        getDoc(doc(db, "usuario", idContacto)).then(docSnap => {
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                console.log("No such document!");
            }
        })
        
        // const docRef = doc(db, "usuario", idContacto);
        // const docSnap = await getDoc(docRef);
        // console.log(docSnap);
        // const nombre = docSnap.data().nombre;
        // console.log(nombre);
        // const urlFoto = docSnap.data().url_foto;
        // console.log(urlFoto);
    
        // const contactDiv = document.createElement('div');
        // contactDiv.className = 'user';
    
        // const avatarDiv = document.createElement('div');
        // avatarDiv.className = 'avatar';
        // contactDiv.innerHTML = avatarDiv;
        
        // const infoUserDiv = document.createElement('div');
        // infoUserDiv.className = 'info-user';
        // contactDiv.innerHTML = infoUserDiv;
    
        // const photo = document.createElement('img');
        
        // if(urlFoto === "default") {
        //     photo.src = "../img/user-circle.svg";
        // } else {
        //     photo.src = urlFoto;
        // }
        
        // avatarDiv.innerHTML = photo;
    
        // const name = document.createElement('span');
        // name.innerText = nombre;
        // infoUserDiv.innerHTML = name;
        
        // contenedorContactos.innerHTML = contactDiv;
    } catch (error) {
        console.log(error.message);
    }

    
}

// tipo:
//      true, para el usuario actual
//      false, para el otro
function showMensaje(mensaje, tipo) {
    if (tipo) {
        
        const boxRightDiv = document.createElement('div');
        boxRightDiv.className = 'box-right';

        const spaceDiv = document.createElement('div');
        spaceDiv.className = 'space';
        boxRightDiv.innerHTML = spaceDiv;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message m-right';
        boxRightDiv.innerHTML = messageDiv;

        const p = document.createElement('p');
        p.innerText = mensaje;

    
    } else {

        const boxLeftDiv = document.createElement('div');
        boxLeftDiv.className = 'box-left';

        const spaceDiv = document.createElement('div');
        spaceDiv.className = 'space';
        boxLeftDiv.innerHTML = spaceDiv;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message m-left';
        boxLeftDiv.innerHTML = messageDiv;

        const p = document.createElement('p');
        p.innerText = mensaje;

        
    }
}

//  async function sendMensaje(idChat, mensaje) {

//     const docRef = doc(db, "chat", idChat);
//     const docSnap = await getDoc(docRef);
//     const mensajes = docSnap.data().mensajes;
//     mensajes.push(mensaje);

//     await updateDoc(docRef, {
//         mensajes: mensajes
//     });

    
    
// }