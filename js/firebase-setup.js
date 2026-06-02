// js/firebase-setup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC5afolIrBJi3JYaxa7Lmu5fkw4mMJijB4",
  authDomain: "eliterhodes-db.firebaseapp.com",
  projectId: "eliterhodes-db",
  storageBucket: "eliterhodes-db.firebasestorage.app",
  messagingSenderId: "380434040608",
  appId: "1:380434040608:web:747c0271e17dfff1b43945",
  measurementId: "G-T6K114V7MP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
