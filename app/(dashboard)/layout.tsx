
import Sidebar from '@/components/sidebar'
import React from 'react'

const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='w-full h-full flex '>
    <Sidebar/>
    <div className='p-4'>

    {children}
    </div>
    </div>
  )
}

export default layout