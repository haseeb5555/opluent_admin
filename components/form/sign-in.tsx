"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl, 
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { toast,Toaster } from "sonner"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email('email should be unique'),
  password:z.string().min(2,{
    message:'password must have at least 3 characters',
  })
})

export function Login() {
  const router =useRouter()
  const form = useForm({
    resolver: zodResolver(formSchema), // <-- here is how you can pass Zod schema to the form
    defaultValues:{ email:"",password:""}
  })

  async function onSubmit(values:z.infer<typeof formSchema>){
  
    try {
      
      const res= await  fetch("/api/login",{
            method:"POST",
            headers :{"Content-Type":"application/json"},
            body:JSON.stringify({email:values.email,password:values.password}),
        })
    
         const data = await res.json()
         if(data.message==='login successfuly'){
            router.push('/')
         }
         if(data.message==='wrong password'){
           toast.error('Wrong Password')
         }
    } catch (error:any) {
       console.log(error)
    }
  }  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8 bg-slate-200 px-20 py-12   rounded-3xl shadow-2xl ">
      <h1 className="font-bold text-center text-xl">Admin</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Email" type="email" className="rounded-3xl px-4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
          <Toaster richColors position="bottom-left"/>
            <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter Password" type="password" className="rounded-3xl px-4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-green-600 px-8 py-4 rounded-3xl">Sign In</Button>
      </form>
    </Form>
  )
}
