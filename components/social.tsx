"use client"
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Button } from './ui/button'
import { userfirebase } from '@/context/firebase'
import { useRouter } from 'next/navigation'
import { register } from '@/actions/register'
const SERVER = process.env.NEXT_PUBLIC_SERVER
import axios from 'axios'
const Social =({variant}:{variant: "LOGIN" | "SIGNUP"}) => {
  const router= useRouter()
  const {signinwithgoogle, auth} =userfirebase()
  const handlegoogle=async()=>{
    await signinwithgoogle()

      
        if(variant=="SIGNUP"){
            register().then((response)=>{
              if(response.success){

                router.push("/main/dashboard")
              } 
              else{
                alert("Some Error Occured while registering")
              }
            })
          }
          else{
          router.push("/main/dashboard")

      
        }
      }
      

  
  return (
    <div className='flex w-full gap-x-4'>
        <Button variant={"outline"} className='w-full' onClick={handlegoogle}>
            <FcGoogle className='text-2xl w-full'/>

        </Button>
        
    </div>
  )
}

export default Social