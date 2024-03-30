
import Sidebar from '@/components/sidebar'
import React from 'react'

const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='w-full h-full flex '>
    <Sidebar/>
    <div className='py-6 px-4 w-full'>

    {children}
    </div>
    </div>
  )
}

export default layout