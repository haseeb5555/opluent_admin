
import Image from 'next/image';
import React from 'react'
interface Props{
  image:string;
  name:string;
  quantity:string;
  commodityType:string;
  price:string
}
const Card = ({image,name,quantity,commodityType,price}:Props) => {
console.log(image)
console.log("hahahha")
  
  return (
    <div className=" flex flex-col justify-center items-start h-80 w-80 gap-4 shadow-2xl rounded-3xl px-4 py-2">
    
    <div className="card-body">
      <Image src={ image} alt={name} width={240} height={140} className='object-contain w-[240px] h-[140px]'/>
  
      <h2 className="card-title"><span className='text-gray-500 text-[14px]'></span>{name}</h2>
      <p className=''> <span className='text-gray-500 ml-2'>
       available </span>{quantity}</p>
      <div className="card-actions justify-start">
        <button className="btn bg-green-500">{price}</button>
      </div>
  </div>
  </div>
  )
}

export default Card
