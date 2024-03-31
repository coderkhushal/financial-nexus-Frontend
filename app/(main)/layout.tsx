"use client"
import Sidebar from '@/components/sidebar'
import { ScrollArea } from '@radix-ui/react-scroll-area'

import React from 'react'


const MainLayout = ({children}:{children: React.ReactNode}) => {
  

  return (
    <div className='w-full h-full flex '>
    <Sidebar/>
    {/* <Suspense fallback={<Loading/>}> */}

      
    <div className='py-6 px-4 w-full h-full overflow-y-scroll'>


    {children}
    </div>
      
    {/* </Suspense> */}
    </div>
  )
}

export default MainLayout