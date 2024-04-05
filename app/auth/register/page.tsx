"use client"
import CardWrapper from '@/components/card-wrapper'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RegisterSchema } from '@/schemas'
import {  z } from 'zod'
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

import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import Social from '@/components/social'
import { register } from '@/actions/register'
import { userfirebase } from '@/context/firebase'
import { useRouter } from 'next/navigation'
const RegisterPage = () => {
    const router= useRouter()
    const [error, seterror]= useState<string | undefined>(undefined)
    const [success, setsuccess]= useState<string | undefined>(undefined)
    const [Pending , setPending] = useState(false)
    const {signupwithemailandpassword} = userfirebase()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver : zodResolver(RegisterSchema),
        defaultValues : {
            email : "",
            password : "",
            username:""

        }
    })

    async function onSubmit(values : z.infer<typeof RegisterSchema>) {
        setsuccess("")
        seterror("")
        setPending(true)
        try{

            signupwithemailandpassword(values.email, values.password).then((resp)=>

                register(usercred,values.username).then((data)=>{
                    if(data.success){
                        router.push("/main/dashboard")
                    }
                    setsuccess(data.success)
                    seterror(data.error)
                    setPending(false)
                })
            )

        }
        catch(err){
            
            seterror(`Email already in use`)
            setPending(false)
        }
            
        
    }
  return (
    <div className='h-full w-full bg-[#261655] flex justify-center items-center'>
        <CardWrapper heading='Register your account' backbuttonhref='/auth/login' backbuttonlabel='Already have an account?'>
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
            >
                <FormField
                disabled= {Pending}
                    control={form.control}
                    name="username"
                    render= {({field})=>(
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input 
                                placeholder='John Doe'
                                disabled= {Pending}
                                 {...field} />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                        
                    )}
                />
                <FormField
                disabled= {Pending}
                    control={form.control}
                    name="email"
                    render= {({field})=>(
                        <FormItem>
                            <FormLabel>Email/phone</FormLabel>
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
                <div className='w-full text-center text-base font-light my-0'>or continue with</div>
                <Social variant='SIGNUP' />
        <Button type="submit" className='w-full'>Submit</Button>   
                
                
            </form>
        </Form>
        </CardWrapper>
    </div>
  )
}

export default RegisterPage