

import { UserCredential } from "firebase/auth";
const SERVER= "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io"
import { auth } from "@/context/firebase";

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

        const resp = await fetch(`${SERVER}/user/create-user`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + firebase_user_id,
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({name, email, firebase_user_id})
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