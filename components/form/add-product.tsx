"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Toaster, toast } from 'sonner'
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

import { useState,ChangeEvent } from "react"
import { useRouter } from "next/navigation"

import { useUploadThing } from "@/lib/uploadthing"
import { isBase64Image } from "@/lib/utils"
import { PriceType } from "../PriceType"

const formSchema = z.object({
    image:z.string(),
   name:z.string(),
    quantity:z.string(),
    commodityType:z.string(),
    price:z.string(),
    
  })
  
  export function AddProduct() {
    const [files, setFiles] = useState<File[]>([])
    const {startUpload}= useUploadThing('media');


  const router = useRouter()

 const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:{
      image:"",name:"",quantity:"",commodityType:"",price:""
    }

 })


 const onSubmit = async(values: z.infer<typeof formSchema>)=>{
  const blob = values.image
  const hasIsImageChanged = isBase64Image(blob)

  if (hasIsImageChanged){

    const imgRes= await startUpload(files)

    if (imgRes && imgRes[0].fileUrl)
    {
      values.image = imgRes[0].fileUrl
    }
  }


  try {
       await fetch("/api/products",{
          method:'POST',headers:{'Content-Type':'application/json'},
          body:JSON.stringify(
          { image:values.image
            ,name:values.name,
            quantity:values.quantity,
            commodityType:values.commodityType
            ,price:values.price
          }
            )

      });

      toast.success("Product add Successfully")
      form.reset()
  } catch (error) {
      console.log(error) 
      toast.error("Something went wrong")
  }
}

const handleImage=(e:ChangeEvent<HTMLInputElement>,fieldChange:(value:string)=>void)=>{
  e.preventDefault();
  const fileReader = new FileReader();
  if (e.target.files && e.target.value.length>0){
    const file = e.target.files[0];

    setFiles(Array.from(e.target.files))

    if (!file.type.includes('image')) return;

    fileReader.onload = async (event)=>{

    const imageDataUrl = event.target?.result?.toString()|| ''

    fieldChange(imageDataUrl)
    }

    fileReader.readAsDataURL(file)
  }
}
console.log()
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" relative w-full space-y-8 px-20 max-sm:px-8 ">
            <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" font-bold text-blue-900">Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} type="text"className= "bg-transparent rounded-3xl text-[14px] " />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <Toaster richColors position="top-center" />
                <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
          <FormLabel className=" font-bold text-blue-900">Quantity</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} type="text"className="bg-transparent rounded-3xl text-[14px]" />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
              <FormField
          control={form.control}
          name="commodityType"
          render={({ field }) => (
            <FormItem>
           <FormLabel className=" font-bold text-blue-900">Commidity Type</FormLabel>
              <FormControl>
                <Input placeholder="Enter Type" {...field} type="text"
                className="bg-transparent rounded-3xl  text-[14px]" />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
           <FormLabel className=" font-bold text-blue-900">Price</FormLabel>
              <FormControl>
                <Input placeholder="Enter Price" {...field} type="text" 
                className="bg-transparent rounded-3xl text-[14px] pl-8" />
              </FormControl>
             
              <FormMessage />
              <PriceType/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                 type="file"
                 accept="image/*"
                 onChange={(e)=>handleImage(e,field.onChange)}
                 className="bg-transparent rounded-3xl text-[14px]  " />
                 
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary" 
        className="bg-green-500 text-blue-950 px-8 py-4 rounded-3xl">Create</Button>
      </form>
    </Form>
  )
}
