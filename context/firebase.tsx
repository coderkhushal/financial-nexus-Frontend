"use client";

// Import the functions you need from the SDKs you need
import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
  signInWithEmailAndPassword,
  signOut,
  Auth,
  onAuthStateChanged,
} from "firebase/auth";

import { useRouter } from "next/navigation";
const firebaseConfig = {
  apiKey: "AIzaSyA4zcVGS8WfwIvRQUhKsTB5-x78GRdGWTg",
  authDomain: "financial-dashboard-e0c5f.firebaseapp.com",
  projectId: "financial-dashboard-e0c5f",
  storageBucket: "financial-dashboard-e0c5f.appspot.com",
  messagingSenderId: "395026777124",
  appId: "1:395026777124:web:3113913964a86377a804b1",
  measurementId: "G-60TLWJCZYL",
};

type AuthContextType = {
  signinwithemailandpassword: (
    email: string,
    password: string
  ) => Promise<UserCredential | void>;
  signupwithemailandpassword: (
    email: string,
    password: string
  ) => Promise<UserCredential | void>;
  signinwithgoogle: () => Promise<UserCredential | void>;
  handlesignout: () => Promise<{ message: string }>;
  setUser: (user: UserCredential | null) => void;
  auth : Auth;
  User: UserCredential | null;
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const siginincontext = createContext<AuthContextType>({
  signupwithemailandpassword: () => Promise.resolve(),
  signinwithemailandpassword: () => Promise.resolve(),
  signinwithgoogle: () => Promise.resolve(),
  handlesignout: () => Promise.resolve({ message: "" }),
  setUser: () => { },
  auth : auth,
  User: null,
});

export const Signinprovider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  
  const [User, setUser] = useState<UserCredential | null>(null);
  useEffect(() => {
    const unsubscribe= onAuthStateChanged(auth, (user)=>{
      if(!user){
        setUser(null)
        router.push("/auth/login")
      }
      return ()=> unsubscribe()
    })
  }, [router]);
  //login with email and password
  const signinwithemailandpassword = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password).then(
      (usercred: UserCredential) => {
        setUser(usercred);
        localStorage.setItem("user", JSON.stringify(usercred));
        return usercred;
      }
    );

  const signupwithemailandpassword = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password).then(
      (usercred: UserCredential) => {
        setUser(usercred);
        localStorage.setItem("user", JSON.stringify(usercred));
        return usercred;
      }
    );

  //login with google
  const signinwithgoogle = () =>
    signInWithPopup(auth, provider).then((usercred) => {
      setUser(usercred);
      localStorage.setItem("user", JSON.stringify(usercred));

      return usercred;
    });

  const handlesignout = () =>
    signOut(auth).then(() => {
      localStorage.removeItem("user");
      setUser(null);
      router.push("/");

      return { message: "user signed out" };
    });
  return (
    <siginincontext.Provider
      value={{
        signinwithemailandpassword,
        signinwithgoogle,
        signupwithemailandpassword,
        setUser,
        handlesignout,
        User,
        auth
      }}
    >
      {children}
    </siginincontext.Provider>
  );
};

export const userfirebase = () => {
  return useContext(siginincontext);
};
