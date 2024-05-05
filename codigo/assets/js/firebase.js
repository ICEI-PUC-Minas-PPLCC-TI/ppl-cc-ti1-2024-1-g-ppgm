import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyBWa_Gi8i1abYquay5OtkARs9khMq5lkJc",
    authDomain: "portal-pinguins.firebaseapp.com",
    projectId: "portal-pinguins",
    storageBucket: "portal-pinguins.appspot.com",
    messagingSenderId: "386664806202",
    appId: "1:386664806202:web:798d774f24c51203818203"
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
