import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Button } from './ui/button'
import { userfirebase } from '@/context/firebase'
const Social = () => {
  const {signinwithgoogle} =userfirebase()
  return (
    <div className='flex w-full gap-x-4'>
        <Button variant={"outline"} className='w-full' onClick={signinwithgoogle}>
            <FcGoogle className='text-2xl w-full'/>

        </Button>
        <Button variant="outline" className='w-full'>
            <FaGithub className='text-2xl w-full'/>
        </Button>
    </div>
  )
}

export default Social