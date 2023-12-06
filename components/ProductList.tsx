"use client"
 
 import { Toaster, toast } from 'sonner'
import Card from '@/components/Card'

import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import {HiPencilAlt, HiTrash} from 'react-icons/hi'
import React from 'react'
import Link from 'next/link'

import { Alert } from '@/components/Alert'


export default function ProductList() {
   
  

  const { data, isLoading } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/products");
      return response.data.product; 
  }})

  console.log(data);
  return (
       
      <main className='flex justify-center items-center gap-8 flex-wrap '>
         {isLoading ?    (<>
                        <span className="loading loading-ring loading-xs"></span>
                        <span className="loading loading-ring loading-sm"></span>
                        <span className="loading loading-ring loading-md"></span>
                        <span className="loading loading-ring loading-lg"></span>
                         </>) : null}
        
         {data &&data.map((product:any)=>(
          
        <React.Fragment key={product.name}>

          <Card image={product.image}
          name={product.name}
          price={product.price}
          quantity={product.quantity}
          commodityType={product.commodityType}
          />
             <div className=' relative top-32 -left-[72px] max-sm:-top-16 max-sm:left-[162px]'>
                <Alert  id={product._id}/>

             </div>
              <Link href={`/editProduct/${product._id}`} className='relative -top-32 -left-32 max-sm:-top-[350px] max-sm:left-[102px]' >
                          <HiPencilAlt size={24}/>
                    </Link>

          </React.Fragment>
         ))}



  
      </main>
  )
}