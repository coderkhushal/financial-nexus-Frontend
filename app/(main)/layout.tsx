"use client"
import Sidebar from '@/components/sidebar'
import { userfirebase } from '@/context/firebase'
import { useRouter } from 'next/navigation'
import React from 'react'


const MainLayout = ({children}:{children: React.ReactNode}) => {
  const router =useRouter()
  const {User} = userfirebase()
  if(!User){
    router.push('/auth/register')
  
  }
  return (
    <div className='w-full h-full flex '>
    <Sidebar/>
    {/* <Suspense fallback={<Loading/>}> */}

    <div className='py-6 px-4 w-full'>

    {children}
    </div>
    {/* </Suspense> */}
    </div>
  )
}

export default MainLayout