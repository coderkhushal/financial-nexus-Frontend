"use client"

import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(1,{
    message: "Password cannot be empty",
  })
})


export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8,{
    message: "Password must be at least 8 characters",
  }),
  username: z.string().min(1,{
    message: "Username cannot be empty",
  })
  
})
