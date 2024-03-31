import { auth } from "@/context/firebase";



export const getHeaders=async(token?: string)=>{

        if(!token){

             token = await  auth.currentUser?.getIdToken( )
        }
        return {
            "Authorization": "Bearer " + token,
            'Content-Type': 'application/json'
        };


}