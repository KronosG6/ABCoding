import { auth } from "./app/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {
  // Comprobar estado de logueo del usuario
});
