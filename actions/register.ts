

import { UserCredential } from "firebase/auth";
const SERVER= process.env.NEXT_PUBLIC_SERVER
import { auth } from "@/context/firebase";
import axios from "axios";

export const register= async (usercred: UserCredential | void, name?: string )=>{
    if(!auth.currentUser){
        return {"error":"Email already in user"}
    }
    if(auth.currentUser.displayName){
        name = auth.currentUser.displayName
    }
    
    let firebase_user_id= auth.currentUser.uid
    let email =auth.currentUser.email
    try{

        const resp = await axios.post(`${SERVER}/user/create-user`, 
            {"name": name, "email": email, "firebase_user_id": firebase_user_id},
            {
            headers: {
                'Content-Type': 'application/json'
            } 
            
        })
        if(resp.status !== 200){
            return {"error":"Internal Server Error", success:undefined}
        }
        else{
            
            return {"success":"User registered successfully", error: undefined}
        }
    }
    catch(err){
        return {"error":"Internal Server Error", success: undefined}
    
    }
}