import firebase from "firebase";

const config = {
  apiKey: "AIzaSyA8Lyg1pYIsX1sQZY8QTOIDmNV7VpRLywM",
  authDomain: "coord-pesquisa-penedo.firebaseapp.com",
  databaseURL: "https://coord-pesquisa-penedo.firebaseio.com/",
  projectId: "coord-pesquisa-penedo",
  storageBucket: "coord-pesquisa-penedo.appspot.com",
  messagingSenderId: "121885146252",
  appId: "1:121885146252:web:76bd638365d65da74f8fa9",
  measurementId: "G-980B0B4E3K"
};

export const app = firebase.initializeApp(config);
export const db = firebase.firestore();
export const auth = firebase.auth();
