import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDXt3A2bAA6goMKnOSQMbHsFuavTNQlOf4",
  authDomain: "tanman-fasciamax.firebaseapp.com",
  projectId: "tanman-fasciamax",
  storageBucket: "tanman-fasciamax.firebasestorage.app",
  messagingSenderId: "504111897476",
  appId: "1:504111897476:web:ff0ae3a9a95567af1c5bd1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);