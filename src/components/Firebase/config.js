/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCm11RZuD2LLBplL-tO9Mh3p6SF7naBzvU",
    authDomain: "playitstore-ece6e.firebaseapp.com",
    projectId: "playitstore-ece6e",
    storageBucket: "playitstore-ece6e.firebasestorage.app",
    messagingSenderId: "441783803586",
    appId: "1:441783803586:web:771d0e0c8d14089c92655b",
    measurementId: "G-V2MPZG7R6X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();
export { auth, provider };
