import { doc, setDoc, getDoc, deleteDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
import { database } from "./firebase.js"

export const rules = {
    "User": {
        id: 'email',
        params: [
            'name',
            'curso',
            'phone',
            'email',
        ]
    },
    "Sport": {
        id: 'name',
        params: [
            'name',
            'date',
            'start-time',
            'end-time',
            'local',
        ]
    },
    "Question": {
        id: 'question',
        params: [
            'question',
            'user',
            'date',
        ]
    },
}

async function collectionExists(collection_name) {
    if(rules.hasOwnProperty(collection_name)) return true;
    return false;
}

async function existInCollection(collection_name, id) {
    if(!collectionExists(collection_name)) return null;

    const docPath = doc(database, collection_name + '/' + id);
    const snapShot = await getDoc(docPath);
    return snapShot.exists();
}

export async function create(collection_name, data) {
    if(!collectionExists(collection_name)) return false;

    const collectionRules = rules[collection_name];

    if(!await existInCollection(collection_name, data[collectionRules.id])) {
        const docPath = doc(database, collection_name + '/' + data[collectionRules.id]);
        await setDoc(docPath, data);
        return true;
    }
    return false;
}

export async function read(collection_name, id=null) {
    if(!collectionExists(collection_name)) return null;

    if(id == null) {
        const colRef = collection(database, collection_name);
        const querySnapshot = await getDocs(colRef);
    
        const items = [];
        querySnapshot.forEach(doc => {
            items.push({ id: doc.id, ...doc.data() });
        });
    
        return items;
    }

    const docPath = doc(database, collection_name + '/' + id);
    const snapShot = await getDoc(docPath);
    if(snapShot.exists()) return snapShot.data();

    return null;
}

export async function update(collection_name, id, data) {
    if(!collectionExists(collection_name)) return false;

    try {
        const docPath = doc(database, collection_name, id);
        await setDoc(docPath, data, { merge: true });
        return true;
    }
    catch (error) {
        console.error("Error updating document:", error);
        return false;
    }
}

export async function remove(collection_name, id) {

    if(await existInCollection(collection_name, id)) {
        const docPath = doc(database, collection_name + '/' + id);
        await deleteDoc(docPath);
        return true;
    }
    return false;
}

export function getCollections() {
    return Object.keys(rules);
}

export function getParams(collectionName) {
    return rules[collectionName];
}

export function getIdColletion(collection_name) {
    return rules[collection_name].id;
}

export function auth() {
    return localStorage('token');
}
