import Sidebar from '@/components/sidebar'
import React from 'react'

const DesktopSidebar = () => {
  return (
    <div className='hidden lg:flex md:flex overflow-y-hidden'>
    <Sidebar/>
    </div>
  )
}

export default DesktopSidebar