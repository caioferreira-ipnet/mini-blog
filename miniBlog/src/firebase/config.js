// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD78CAEg2EUGQ3eYy50cjYoJMLlAEe_Zh0",
  authDomain: "miniblog-4c12f.firebaseapp.com",
  projectId: "miniblog-4c12f",
  storageBucket: "miniblog-4c12f.firebasestorage.app",
  messagingSenderId: "848037705767",
  appId: "1:848037705767:web:f2c1148005423ef9297602",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
