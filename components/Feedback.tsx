"use client"

import { Textarea } from "./ui/textarea"

import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { useRouter } from "next/navigation"
import { Toaster, toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

  const schema = z.object({
    remark: z.string().nonempty({ message: "Remarks is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    poNo: z.string().nonempty({ message: "poNo is required" }),
  })


export default function Feedback({params}:{params:{id:string}}) {


  const router = useRouter()

  const { data,isLoading} = useQuery({
    queryKey: ['po'],
    queryFn: async () => {
      const response = await axios.get(`/api/po/${params.id}`);
      return response.data;
    }
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      poNo: "",
      email: "",
      remark: "",
    }
  })
  

  const onSubmit = async (values:z.infer<typeof schema>) => {
     const res=   await fetch('/api/remarks', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
  if(res.ok){
     toast.success("Remarks added successfully")

  }
    
 await fetch(`/api/po/${params.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({status:"rejected"}),
  })

  setTimeout(()=>{

    router.push('/pending-orders')
  },700)
   console.log(values)
}
  return (
   
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Reject Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Give Remarks</DialogTitle>
          <DialogDescription>
           Define here the reason why you are not accepted customer order
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="font-bold text-xl"> <span >PO#</span> {data?.order?.poNo}</h2>
        <FormField
          control={form.control}
          name="poNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>poNo</FormLabel>
              <FormControl>
               <Input {...field}  
                className="w-full border border-gray-300 rounded-md"
                 value={data?.order?.poNo}
              
                placeholder="poNo"
               
               />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Toaster/>
      <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
               <Input {...field}  
                className="w-full border border-gray-300 rounded-md"
                value={data?.order?.email}
              
                placeholder="Email"
               
               />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remark</FormLabel>
              <FormControl>
               <Textarea {...field}  
                className="w-full border border-gray-300 rounded-md"
                rows={3}
                placeholder="Enter your remarks here"
               
               />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" className="bg-green-600 px-6 py-4">Submit</Button>
        </DialogFooter>
        </form>
    </Form>
      </DialogContent>
    </Dialog>
  )
}

