"use client"
import ChatWidget from '@/components/chatwidget'
import DesktopSidebar from '@/components/desktopsidebar'
import MobileSidebar from '@/components/mobilesidebar'
import Navbar from '@/components/navbar'
import { userfirebase } from '@/context/firebase'

import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useRouter } from 'next/navigation'

import React, { useEffect } from 'react'


const MainLayout = ({children}:{children: React.ReactNode}) => {
    const {auth} = userfirebase()
    const router = useRouter()
    useEffect(()=>{
        if(!auth.currentUser){
            router.push('/auth/login')
        }
        console.log(auth.currentUser)
        
    
      
    }, [auth.currentUser])

  return (
    <div className='w-full h-full flex '>
    <DesktopSidebar/>

    {/* <Suspense fallback={<Loading/>}> */}
    <ChatWidget/>
      <div className='w-full overflow-y-hidden bg-gray-200'>

    <Navbar/>
    <div className='py-6 px-4 w-full h-full overflow-y-scroll'>

    {children}
    </div>
      </div>
      
    {/* </Suspense> */}
    </div>
  )
}

export default MainLayout