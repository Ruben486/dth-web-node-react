import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FB_API_KEY,
    authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FB_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FB_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { db, auth };
// contexto de autenticacion 


// actualizar tipos de contexto

// dependencias
// npm install firebase react-icons

// reglas de seguridad en firebase
// En la consola de Firebase, configura las reglas de Firestore
// rules_version = '2';
// service cloud.firestore {
//  match /databases/{database}/documents {
//    match /users/{userId} {
//      allow read: if request.auth != null && request.auth.uid == userId;
//      allow write: if request.auth != null && request.auth.uid == userId;
//    }
//  }
//}