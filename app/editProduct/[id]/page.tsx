import { EditProduct } from '@/components/form/edit-product'
import React from 'react'

interface Product{
    image:string;
    name:string;
    quantity:string;
    commodityType:string;
    price:string
  }
const page = async ({params}:{params:{id:string}}) => {

  

  return <EditProduct 
 params={params}
  />
}

export default page

