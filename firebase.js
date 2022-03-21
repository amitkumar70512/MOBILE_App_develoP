// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuAEdk7cDZ0dnV9n8p2p4kLJORPJMQ8TM",
  authDomain: "fir-auth-192c5.firebaseapp.com",
  projectId: "fir-auth-192c5",
  storageBucket: "fir-auth-192c5.appspot.com",
  messagingSenderId: "959176782822",
  appId: "1:959176782822:web:49e94f031a982115b7dc27"
};

// Initialize Firebase
let app;
app = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export { auth };
export const db= getFirestore(app);