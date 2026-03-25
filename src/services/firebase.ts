import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBNC87WO7B8ZJowxM1QfZgR0j1IAs9d_Rk",
  authDomain: "arquisim-9efc6.firebaseapp.com",
  projectId: "arquisim-9efc6",
  storageBucket: "arquisim-9efc6.firebasestorage.app",
  messagingSenderId: "742505732732",
  appId: "1:742505732732:web:a60ef2e21913b33911c7f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);
