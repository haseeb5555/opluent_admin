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
import {useQuery} from '@tanstack/react-query'
import { useUploadThing } from "@/lib/uploadthing"
import { isBase64Image } from "@/lib/utils"
import axios from "axios"

const formSchema = z.object({
    newImage:z.string(),
   newName:z.string(),
    newQuantity:z.string(),
    newCommodityType:z.string(),
    newPrice:z.string(),
    
  })

//   interface Props{
//     image:string;
//     name:string;
//     quantity:string;
//     commodityType:string;
//     price:string
//   }
  
  export function EditProduct({params}:{params:{id:string}}) {

    const { data } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
          const response = await axios.get(`http://localhost:3000/api/products/${params.id}`);
          return response.data.product; 
      }})
    
     
  console.log(data)
    const [files, setFiles] = useState<File[]>([])
    const {startUpload}= useUploadThing('media');


  const router = useRouter()

 const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:{
      mewImage:data?.image,newName:data?.name,newQuantity:data?.quantity,newCommodityType:data?.commodityType,newPricerice:data?.price
    }

 })


 const onSubmit = async(values: z.infer<typeof formSchema>)=>{
  const blob = values.newImage
  const hasIsImageChanged = isBase64Image(blob)

  if (hasIsImageChanged){

    const imgRes= await startUpload(files)

    if (imgRes && imgRes[0].fileUrl)
    {
      values.newImage = imgRes[0].fileUrl
    }
  }


  try {
       await fetch(`http://localhost:3000/api/products/${params.id}`,{
          method:'PUT',headers:{'Content-Type':'application/json'},
          body:JSON.stringify(
          { newImage:values.newImage
            ,newName:values.newName,
            newQuantity:values.newQuantity,
            newCommodityType:values.newCommodityType
            ,newPrice:values.newPrice
          }
            )

      });

      toast.success("Product updated Successfully")
      setTimeout(()=>{

        router.push('/')
      },700)
     
  } catch (error) {
      console.log(error) 
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
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full space-y-8 px-20 ">
        <FormField
          control={form.control}
          name="newImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
    
              </FormLabel>
              <FormControl>
                <Input
                
                type="file" accept="image/*" onChange={(e)=>handleImage(e,field.onChange)} className="bg-slate-200 rounded-xl text-green-500 !ring-0  ring-white"/>
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
         
            <FormField
          control={form.control}
          name="newName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} type="text"className="bg-slate-200 rounded-xl text-green-500 !ring-0  ring-white" />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <Toaster richColors position="top-center" />
                <FormField
          control={form.control}
          name="newQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} type="text"className="bg-slate-200 rounded-xl text-green-500 !ring-0  ring-white" />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
              <FormField
          control={form.control}
          name="newCommodityType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} type="text"className="bg-slate-200 rounded-xl text-green-500 !ring-0  ring-white" />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
              <FormField
          control={form.control}
          name="newPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price:$/pkr</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} type="text"className="bg-slate-200 rounded-xl text-green-500 !ring-0  ring-white" />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary" className="bg-green-500 text-blue-950 px-8 py-4 rounded-3xl">Update</Button>
      </form>
    </Form>
  )
}
