

import { UserCredential } from "firebase/auth";
const SERVER= "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io"


export const register= async (usercred: UserCredential | void, name?: string )=>{
    if(!usercred){
        return {"error":"Email already in user"}
    }
    if(usercred.user.displayName){
        name = usercred.user.displayName
    }
    
    let firebase_user_id= await usercred.user.uid
    let email =await  usercred.user.email
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
            return {"error":"Internal Server Error"}
        }
        else{
            
            return {"success":"User registered successfully", error: undefined}
        }
    }
    catch(err){
        return {"error":"Internal Server Error"}
    
    }
}