import React from 'react'

import {useRouter} from 'next/navigation'
interface Props{
    id:string;
}
const RemoveButton = ({id}:Props) => {
    const route= useRouter()

    
    const removeProduct=async()=>{
     const res=   await fetch(`http://localhost:3000/api/products?id=${id}`,{
            method:'DELETE',
        })

        if(res.ok){
             
            route.refresh()
        }
    }
  return (
   <button className='bg-green-500 px-4 py-2 hover:bg-green-300' onClick={removeProduct}>
     Continue
   </button>
  )
}

export default RemoveButton
