"use client";

// Import the functions you need from the SDKs you need
import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA4zcVGS8WfwIvRQUhKsTB5-x78GRdGWTg",
  authDomain: "financial-dashboard-e0c5f.firebaseapp.com",
  projectId: "financial-dashboard-e0c5f",
  storageBucket: "financial-dashboard-e0c5f.appspot.com",
  messagingSenderId: "395026777124",
  appId: "1:395026777124:web:3113913964a86377a804b1",
  measurementId: "G-60TLWJCZYL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const siginincontext = createContext({});

export const Signinprovider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState();

  //login with email and password
  const signinwithemailandpassword = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password).then((usercred) => {
      console.log(usercred);
      setUser(usercred);
    });
  //login with google
  const signinwithgoogle = () =>
    signInWithPopup(auth, provider).then((usercred) => {
      console.log(usercred);
      setUser(usercred);
    });

  return (
    <siginincontext.Provider
      value={{ signinwithemailandpassword, signinwithgoogle, user }}
    >
      {children}
    </siginincontext.Provider>
  );
};
