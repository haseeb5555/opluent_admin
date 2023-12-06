import { AddProduct } from '@/components/form/add-product'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center  gap-8 '>
       <h1 className='font-bold text-blue-900 text-2xl '>Add Product</h1>
       <AddProduct/>
    </div>
  )
}

export default page
