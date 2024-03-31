"use client"
import { userfirebase } from '@/context/firebase'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const SERVER= "https://financial-nexus-backend.yellowbush-cadc3844.centralindia.azurecontainerapps.io/"
const Page = () => {
  const {auth } = userfirebase()
  const router = useRouter()
  const [transactions, settransactions] = useState()

  const fetchtransactions= async()=>{
    const idtoken = await auth.currentUser?.getIdToken()
    const response = await axios.get(SERVER+ "/data-get/get-transactions", {
      headers:{
        "Authorization": "Bearer "+ idtoken,
        "Content-Type":"application/json"
      }
    })
    settransactions(response.data)
    console.log(response.data)
  }
  useEffect(()=>{
    if(auth.currentUser){
      fetchtransactions()
    }
    else{
      router.push("/auth/login")
    }
  },[auth, router])  
  return (
    <div>this is transaction page</div>
  )
}

export default Page 