
import * as z from "zod"
import { LoginSchema } from "@/schemas"

export const login= async(values:z.infer<typeof LoginSchema>)=>{
    const validate= LoginSchema.safeParse(values)
    if(!validate.success) return {"error": "Invalid Credentials"}
    return {"success": "login successfully"}
    
}