"use client"
import Link from "next/link"
import { useContext } from "react"
import { siginincontext } from "@/context/firebase"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



  
const page = () => {

    const {signinwithemailandpassword,signinwithgoogle,user} = useContext(siginincontext)
    const signin = () => {
        signinwithemailandpassword("jk@gmail.com","helio8980")
        
    }

    console.log(user)
     return (
        <main className="h-full  w-full bg-[#261655] bg-gradient-to-b from-orange-600/[.15] via-transparent flex justify-center items-center">
        <Card className="mx-auto max-w-sm my-12">
      <CardHeader>
        <CardTitle className="text-2xl text-center">SignUp</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            SignUp
          </Button>
          <Button variant="outline" className="w-full" onClick={signinwithgoogle}>
            SignUp with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="#" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
    </main>
    )
  }
  
  export default page

  




