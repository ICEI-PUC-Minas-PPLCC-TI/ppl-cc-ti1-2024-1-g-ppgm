import { doc, setDoc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
import { database } from "./firebase.js"

async function checkExistUser(collection_name, email) {
    const docPath = doc(database, collection_name + '/' + email);
    const snapShot = await getDoc(docPath);
    return snapShot.exists();
}

export async function createUser(collection_name, data) {
    if(!await checkExistUser(collection_name, data['email'])) {
        const docPath = doc(database, collection_name + '/' + data['email']);
        await setDoc(docPath, data);
        return true;
    }
    return false;
}

export async function readUser(collection_name, email=null) {
    const docPath = doc(database, collection_name + '/' + email);
    const snapShot = await getDoc(docPath);
    if(snapShot.exists()) return snapShot.data();
    return null;
}

export async function updateUser(collection_name, email, data) {
    if(await checkExistUser(collection_name, email)) {
        const docPath = doc(database, collection_name + '/' + email);
        await setDoc(docPath, data, { merge: true });
        return true;
    }
    return false;
}

export async function deleteUser(collection_name, email) {
    if(await checkExistUser(collection_name, email)) {
        const docPath = doc(database, collection_name + '/' + email);
        await deleteDoc(docPath);
        return true;
    }
    return false;
}

