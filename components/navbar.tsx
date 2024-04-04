"use client"
import { userfirebase } from '@/context/firebase'
import React, { useEffect, useState } from 'react'
import MobileSidebar from './mobilesidebar'
import { CircleUser } from 'lucide-react'

const Navbar = () => {
    const { auth } = userfirebase()
    useEffect(() => {
        if (auth.currentUser) {

            setname(auth.currentUser?.displayName)
            setprofile(auth.currentUser?.photoURL)
        }


    }, [auth.currentUser])
    const [name, setname] = useState<string | null>(null)
    const [profile, setprofile] = useState<string | null>("")
    return (

        <div className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">

        <MobileSidebar/>
            
            <ul className="ml-auto flex items-center">
                {/* <li className="mr-1 dropdown">
                    <button type="button" className="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center  hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="hover:bg-gray-100 rounded-full" viewBox="0 0 24 24" ><path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path></svg>
                    </button>
                    <div className="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100">
                        <form action="" className="p-4 border-b border-b-gray-100">
                            <div className="relative w-full">
                                <input type="text" className="py-2 pr-4 pl-10 bg-gray-50 w-full outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500" placeholder="Search..." />
                                <i className="ri-search-line absolute top-1/2 left-4 -translate-y-1/2 text-gray-900"></i>
                            </div>
                        </form>
                    </div>
                </li> */}
                {/* <li className="dropdown">
                    <button type="button" className="dropdown-toggle text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center  hover:text-gray-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="hover:bg-gray-100 rounded-full"
                            viewBox="0 0 24 24"
                            style={{
                                fill: 'gray',
                                transform: '',
                                msFilter: ''
                            }}
                        >
                            <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z" />
                        </svg>
                    </button>
                    <div className="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100">
                        <div className="flex items-center px-4 pt-4 border-b border-b-gray-100 notification-tab">
                            <button type="button" data-tab="notification" data-tab-page="notifications" className="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1 active">Notifications</button>
                            <button type="button" data-tab="notification" data-tab-page="messages" className="text-gray-400 font-medium text-[13px] hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1">Messages</button>
                        </div>

                    </div>
                </li> */}
            


                <li className="dropdown ml-3">
                    <button type="button" className="dropdown-toggle flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 relative">
                            <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                                {profile ? <img className="w-8 h-8 rounded-full" src={profile} alt="" /> : <CircleUser/>}
                                <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
                                <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
                            </div>
                        </div>
                        <div className="p-2 md:block text-left">
                            <h2 className="text-sm font-semibold text-gray-800">{name ? name : " "}</h2>

                        </div>
                    </button>
                    <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                        <li>
                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50">Profile</a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50">Settings</a>
                        </li>
                        <li>
                            <form method="POST" action="">
                                <a role="menuitem" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer"
                                >
                                    Log Out
                                </a>
                            </form>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Navbar