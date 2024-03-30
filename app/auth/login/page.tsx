"use client"
import CardWrapper from '@/components/card-wrapper'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LoginSchema } from '@/schemas'
import { set, z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { login } from '@/actions/login'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import Social from '@/components/social'
import { userfirebase } from '@/context/firebase'
import { useRouter } from 'next/navigation'
const LoginPage = () => {
    const router= useRouter()
    const {signinwithemailandpassword} = userfirebase()
    const [error, seterror]= useState<string | undefined>(undefined)
    const [success, setsuccess]= useState<string | undefined>(undefined)

    const [Pending , setPending] = useState(false)

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver : zodResolver(LoginSchema),
        defaultValues : {
            email : "",
            password : ""
        }
    })

    async function onSubmit(values : z.infer<typeof LoginSchema>) {
        setsuccess("")
        seterror("")
        setPending(true)
        try{

            let usercred = await signinwithemailandpassword(values.email, values.password)
            
            if(usercred?.user){
                setsuccess("Login Successful")
                router.push("/dashboard")
            }
            else{
                seterror("Invalid Credentials")
            }
            setPending(false)
            
        }
        catch(err){
            console.log(err)
            seterror(`Invalid Credentails`)
            setPending(false)
        }}
  return (
    <div className='h-full w-full bg-[#261655] flex justify-center items-center'>
        <CardWrapper heading='Welcome back !' backbuttonhref='/auth/register' backbuttonlabel={`Don't have an account?`}>
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
            >
                <FormField
                disabled= {Pending}
                    control={form.control}
                    name="email"
                    render= {({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input 
                                placeholder='JohnDoe@example.com'
                                disabled= {Pending}
                                 {...field} />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                        
                    )}
                />
                <FormField
                    
                    control={form.control}
                    name="password"
                    render= {({field})=>(
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input 
                                placeholder='*****' 
                                type='password'
                                disabled= {Pending}
                                 {...field} />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                        
                    )}
                />

                <FormError message={error} />
                <FormSuccess message={success} />
                <Social variant='LOGIN'/>
        <Button type="submit" className='w-full'>Submit</Button>   
                
                
            </form>
        </Form>
        </CardWrapper>
    </div>
  )
}

export default LoginPage