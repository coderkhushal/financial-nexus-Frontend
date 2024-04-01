"use client"
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Button } from './ui/button'
import { userfirebase } from '@/context/firebase'
import { useRouter } from 'next/navigation'
import { register } from '@/actions/register'
const Social =({variant}:{variant: "LOGIN" | "SIGNUP"}) => {
  const router= useRouter()
  const {signinwithgoogle} =userfirebase()
  const handlegoogle=async()=>{
    signinwithgoogle().then((user)=>{
      
      if(user?.user){
        if(variant=="SIGNUP"){
            register(user).then(()=>{

              router.push("/main/dashboard")
            })
        }
        else{
          router.push("/main/dashboard")
        }
      }
      
    })
  }
  return (
    <div className='flex w-full gap-x-4'>
        <Button variant={"outline"} className='w-full' onClick={handlegoogle}>
            <FcGoogle className='text-2xl w-full'/>

        </Button>
        <Button variant="outline" className='w-full'>
            <FaGithub className='text-2xl w-full'/>
        </Button>
    </div>
  )
}

export default Social