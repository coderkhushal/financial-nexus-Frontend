"use client"
import { userfirebase } from '@/context/firebase'
import { routes } from '@/data/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'

const Sidebar = () => {
    const pathname = usePathname()

    const { handlesignout } = userfirebase()
    return (
        <div
            className="sidebar h-full p-2 w-[300px] relative  text-center bg-gray-900"
        >
            <div className="text-gray-100 text-xl ">
                <Link href="/">
                    <div className=" cursor-pointer p-2.5 mt-1 flex items-center h-full">
                        <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
                        <h1 className="font-bold text-gray-200 text-[15px] ml-3">Financial Nexus</h1>
                        <i
                            className="bi bi-x cursor-pointer ml-28 lg:hidden"

                        ></i>
                    </div>
                </Link>
                <div className="my-2 bg-gray-600 h-[1px]"></div>
            </div>
            {routes.map((route, index) => (
                <Link href={route.route} key={index}>
                    <a>

                        <div
                            className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer ${pathname == route.route && "bg-gray-600"}  hover:bg-blue-600 text-white`}
                        >
                            <i className="bi bi-house-door-fill"></i>
                            <span className="text-[15px] ml-4 text-gray-200 font-bold">{route.name}</span>
                        </div>
                    </a>
                </Link>
            ))}


            <div
                className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bottom-3  absolute  text-white`}
                onClick={handlesignout}
            >
                <i className="bi bi-house-door-fill"></i>
                <span className="text-xl ml-4 text-gray-200 font-bold flex gap-x-3 ">SignOut <FaSignOutAlt /></span>
            </div>


        </div>

    )
}

export default Sidebar