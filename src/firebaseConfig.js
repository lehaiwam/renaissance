// Import the functions you need from the SDKs you need
//import { FIREBASE_API_KEY, FIREBASE_STORAGE_BUCKET, FIREBASE_APP_ID } from "@env"
import * as firebase from 'firebase/compat'
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'

// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseAppConfig = {
  apiKey: "AIzaSyDc8GKVNr_3cC9VmH1HFq1rD6mnwGtS-5c",
  authDomain: "renaissance-5112a.firebaseapp.com",
  projectId: "renaissance-5112a",
  storageBucket: "renaissance-5112a.appspot.com",
  messagingSenderId: "413866920022",
  appId: "1:413866920022:web:73dc99f0c9f178dd8853f7",
};
/*
appId: "1:413866920022:web:6d5368d8e39582658853f7"
*/

// console.log('\n\n   Initializing firebase in firebaseConfig.js...')

// Initialize Firebase
let app = firebase.initializeApp(firebaseAppConfig);
if ( !firebase.app ) {
  app = firebase.initializeApp(firebaseAppConfig);
} else {
  app = firebase.app();
}

export const auth = firebase.auth(); 			//Add to Initialize Authentication
export const db = getFirestore(app);      //Add to Initialize Firestore Database
export const storage = getStorage(app); 	//Add to Initialize Storage

// export const database = getDatabase(app); 		//Add to Initialize Reatime Database