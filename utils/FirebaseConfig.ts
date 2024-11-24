import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "apikey",
  authDomain: "wordle-clone-4d1ca.firebaseapp.com",
  projectId: "wordle-clone-4d1ca",
  storageBucket: "wordle-clone-4d1ca.firebasestorage.app",
  messagingSenderId: "822835841772",
  appId: "1:822835841772:web:95ef5c0be97cb8d033f3c9",
};

const app = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(app);
