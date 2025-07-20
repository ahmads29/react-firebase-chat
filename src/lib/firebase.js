import {
    initializeApp
} from "firebase/app";
import {
    getAuth
} from "firebase/auth";
import {
    getFirestore
} from "firebase/firestore";
import {
    getStorage
} from "firebase/storage";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "reactchat-b68ce.firebaseapp.com",
    projectId: "reactchat-b68ce",
    storageBucket: "reactchat-b68ce.firebasestorage.app",
    messagingSenderId: "969619017809",
    appId: "1:969619017809:web:301d7e73ebbbe93769e870"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)