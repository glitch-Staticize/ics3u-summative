import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyC0L04vNvrz199jPk7YaFyqMY91xLLlKAw",
    authDomain: "summative-1da65.firebaseapp.com",
    projectId: "summative-1da65",
    storageBucket: "summative-1da65.firebasestorage.app",
    messagingSenderId: "335212224539",
    appId: "1:335212224539:web:d925e8341d678d8e55d8be"
};

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };