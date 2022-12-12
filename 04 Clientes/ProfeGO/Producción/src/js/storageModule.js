import { storage } from "./firebase.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

/**
 * Sube un archivo a Firebase Storage y devuelve su URL.
 *
 * @param {File} fileObj - El objeto de archivo a cargar.
 * @param {String} storagePath - La ruta del archivo en el Storage.
 * @returns {String} La URL del archivo subido.
 * @example const fileURL = await uploadFile(selectedFile, "path/fileName.ext");
 */
export async function uploadFile(fileObj, storagePath) {
  // Crea una referencia en Storage para el archivo
  const storageRef = ref(storage, storagePath);
  try {
    // Se sube el archivo en la referencia especificada
    await uploadBytes(storageRef, fileObj);
    // Con la subida hecha, se puede obtener la URL del archivo cargado
    return await getDownloadURL(storageRef);
  } catch (error) {
    switch (error.code) {
      case "storage/unauthorized":
        console.log("User doesn't have permission to access the object");
        break;
      case "storage/canceled":
        console.log("User canceled the upload");
        break;
      case "storage/unknown":
        console.log("Unknown error occurred, inspect ");
        console.log("error.serverResponse:", error.serverResponse);
        break;
    }
  }
}
