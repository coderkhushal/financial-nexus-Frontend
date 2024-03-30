
import Sidebar from '@/components/sidebar'

import React from 'react'


const MainLayout = ({children}:{children: React.ReactNode}) => {


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