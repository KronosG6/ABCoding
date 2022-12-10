
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

