/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
// Initialize Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC06ZFsSqkxW3Oqf81Mtg6wN3-w7qHR-MY",
    authDomain: "urahara-store.firebaseapp.com",
    projectId: "urahara-store",
    storageBucket: "urahara-store.firebasestorage.app",
    messagingSenderId: "811251246432",
    appId: "1:811251246432:web:115ee136f19e6726436a05"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export function crearUsuario(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Credenciales Register", userCredential);
            const user = userCredential.user;
        })
        .catch((error) => {
            console.log(error.errorCode, error.message);
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export function loginEmailPass(email, password) {
    return (
        new Promise((res, rej) => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("Credenciales Login", userCredential);
                    const user = userCredential.user;
                    console.log(user);
                    res(user);
                })
                .catch((error) => {
                    console.log(error.errorCode, error.message);
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    rej(error);
                });
        })
    )

}