import * as z from "zod"

export const SignUpValidation = z.object({
    name: z.string().min(2).max(50),
    username: z.string().min(2).max(50, {message : 'username too short'}),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    // passwordConfirm: z.string().min(8).max(100),
  })
  
  
export const SignInValidation = z.object({
      email: z.string().email(),
      password: z.string().min(8).max(100),
    })
export const PostValidation = z.object({
      caption: z.string().min(2).max(1000),
      file: z.custom<File[]>(),
      location: z.string().min(2).max(1000),
      tags: z.string()
    })