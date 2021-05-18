import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyD6BpPQJ1jxG0oXT6a1CPYDVv4E1XV4pCY",
    authDomain: "covid-resour.firebaseapp.com",
    projectId: "covid-resour",
    storageBucket: "covid-resour.appspot.com",
    messagingSenderId: "528143601842",
    appId: "1:528143601842:web:f0e0e3dfc09ae6c92a79ab",
    measurementId: "G-BPLEKK3PQD"
});



export default firebase;