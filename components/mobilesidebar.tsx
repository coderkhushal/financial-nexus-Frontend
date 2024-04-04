import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

import React from 'react'
import Sidebar from "./sidebar"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"


const MobileSidebar = () => {
  return (
<div className="md:hidden lg:hidden">
<Sheet>
  <SheetTrigger ><HamburgerMenuIcon className="text-2xl"  /></SheetTrigger>
  <SheetContent side={"left"} className="p-0 w-[250px] ">
    
      
        <Sidebar/>
      
    
  </SheetContent>
</Sheet>
</div>

  )
}

export default MobileSidebar  