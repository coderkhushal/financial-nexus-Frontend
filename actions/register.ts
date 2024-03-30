

import { getHeaders } from "@/helpers/getHeaders";
import { UserCredential } from "firebase/auth";
const SERVER= "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io/"


export const register= async (usercred: UserCredential | void, name: string )=>{
    if(!usercred){
        return {"error":"Email already in user"}
    }
    if(usercred.user.displayName){
        name = usercred.user.displayName
    }
    
    let firebase_user_id= await usercred.user.getIdToken()
    let email =await  usercred.user.email
    const resp = await fetch(`${SERVER}/user/create-user`, {
        method: "POST",
        headers: getHeaders(firebase_user_id), 
        body: JSON.stringify({name, email, firebase_user_id})
    })
    if(resp.status !== 200){
        return {"error":"Internal Server Error"}
    }
    else{

        return {"success":"User registered successfully", error: undefined}
    }
}