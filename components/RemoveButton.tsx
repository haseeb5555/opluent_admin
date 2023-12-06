

import React, { useState } from 'react'

import {useRouter} from 'next/navigation'
interface Props{
    id:string;
}
const RemoveButton = ({id}:Props) => {

    const router= useRouter()

    
    const removeProduct=async()=>{
     const res=   await fetch(`http://localhost:3000/api/products?id=${id}`,{
            method:'DELETE',
        })
       
        if(res.ok){
          router.refresh()
        }

   }
  return (
   <button className='bg-green-500 px-4 py-2 hover:bg-green-300' onClick={removeProduct}>
    <span>Delete</span>
   </button>
  )
}

export default RemoveButton
