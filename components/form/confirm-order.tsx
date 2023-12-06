"use client"

import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Textarea } from '../ui/textarea';
const ConfirmOrder = ({ params }: { params: { id: string } }) => {
const router = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ['po'],
    queryFn: async () => {
      const response = await axios.get(`/api/po/${params.id}`);
      return response.data;
    }
  });

  const { handleSubmit, control,register } = useForm();
              const { fields, append, remove } = useFieldArray({
                control,
                name: 'invoiceItems',
              });


  const onSubmit = async (formData) => {
   
   console.log(formData)
    const response = await fetch(
      '/api/invoice',{
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if(response.ok){
      toast.success('Invoice Generated Successfully')
  }    

  await fetch(`/api/po/${params.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({status:"success"}),
  })
     
  router.push("/pending-orders")

  
  }

  return (
    <>
      {isLoading && (
        <>
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
        </>
      )}
      {!isLoading && (
        <div className=''>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-8 px-4 max-sm:flex-wrap">
            <div className="flex max-sm:flex-col  gap-4 ">
              <span className="w-[70px] mr-2 text-blue-500 max-sm:flex-col">PO Date:</span>
              <Controller
                control={control}
                name="invoiceDate"
                defaultValue={data?.order?.poDate}
                render={({ field }) => (
                  <input
                    type="date"
                    {...field}
                    className="w-[300px] border border-gray-300 p-2"
                  />
                )}
              />
             <div className='flex max-sm:flex-col'>

            
            <label className="flex  max-sm:flex-col gap-4">
              <span className="w-[150px] mr-2 text-blue-500 ">Delivery Address:</span>
              <Controller
                control={control}
                name="deliveryAddress"
                defaultValue={data?.order?.deleviryAddress}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="w-[300px] border border-gray-300 p-2"
                  />
                )}
              />
            </label>
            </div>
            </div>
            <Toaster/>
            <div className="flex  max-sm:flex-col gap-4">
              <span className="w-[70px] mr-2 text-blue-500 max-sm:flex-col">Email:</span>
              <Controller
                control={control}
                name="email"
                defaultValue={data?.order?.email}
                render={({ field }) => (
                  <input
                    type="email"
                    {...field}
                    className="w-[300px] border border-gray-300 p-2"
                  />
                )}
              />
            
            <label className="flex max-sm:flex-col gap-4 ">
              <span className="w-[150px] mr-2 text-blue-500">Sales Tax Registration No:</span>
              <Controller
                control={control}
                name="salesTaxRegNo"
                defaultValue={data?.order?.salesTaxRegNo}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="w-[300px] border border-gray-300 p-2"
                  />
                )}
              />
            </label>
            </div>
            <div className="flex max-sm:flex-col gap-4">
              <span className="w-[70px] mr-2 text-blue-500 max-sm:flex-col">NTN No:</span>
              <Controller
                control={control}
                name="ntnNo"
                defaultValue={data?.order?.ntnNo}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="w-[300px] border border-gray-300 p-2"
                  />
                )}
              />
           
            <label className="flex max-sm:flex-col gap-4">
              <span className="w-[150px] mr-2 text-blue-500 max-sm:flex-col">Buyer Name:</span>
              <Controller
                control={control}
                name="buyerName"
                defaultValue={data?.order?.buyerName}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="w-[300px] border border-gray-300 p-2"
                  />
                )}
              />
            </label>
            </div>
            <div className="flex max-sm:flex-col gap-4">
              <span className="w-[70px] mr-2 text-blue-500 max-sm:flex-col">Address:</span>
              <Controller
                control={control}
                name="address"
                defaultValue={data?.order?.address}
                render={({ field }) => (
                  <Textarea
                   
                    rows={5}
                    {...field}
                    className="w-[300px] border border-gray-300 p-2"
                  />
                )}
              />
         
            <label className="flex max-sm:flex-col gap-4">
              <span className="w-[150px] mr-2 text-blue-500 max-sm:flex-col">Contact Number:</span>
              <Controller
                control={control}
                name="contact"
                defaultValue={data?.order?.contact}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="w-[300px] border border-gray-300 p-2"
                  />
                )}
              />
            </label>
            </div>
          
            <div>
          

                    {fields.map((item, index) => (
                   <>
                      <div key={item.id}  className='flex flex-col justify-start items-start '>
                        <div className='flex justify-between items-start gap-6'>

                      
                        <label>Item Name</label>
                        <input
                          type="text"
                          {...register(`invoiceItems[${index}].itemName`)}
                          defaultValue={item.itemName}
                          className="border border-gray-300 p-2"
                        />
                        <label>Quantity</label>
                        <input
                          type="number"
                          {...register(`invoiceItems[${index}].quantity`)}
                          defaultValue={item.quantity}
                          className="border border-gray-300 p-2"
                        />
                        <label>Unit</label>
                        <input
                          type="text"
                          {...register(`invoiceItems[${index}].unit`)}
                          defaultValue={item.unit}
                          className="border border-gray-300 p-2"
                        />
                          </div>
                          <div className='flex justify-between items-start gap-6'>
                        <label>Rate Per Unit</label>
                        <input
                          type="number"
                          {...register(`invoiceItems[${index}].ratePerUnit`)}
                          defaultValue={item.ratePerUnit}
                          className="border border-gray-300 p-2"
                        />
                        <label>Price Exc. of Tax</label>
                        <input
                          type="number"
                          {...register(`invoiceItems[${index}].priceExcOfTax`)}
                          defaultValue={item.priceExcOfTax}
                          className="border border-gray-300 p-2"
                        />
                        <label>Sales Tax</label>
                        <input
                          type="number"
                          {...register(`invoiceItems[${index}].salesTax`)}
                          defaultValue={item.salesTax}
                          className="border border-gray-300 p-2"
                          />
                          </div>
                          <div className='flex '>

                         
                        <label>Price Inc. of Tax</label>
                        <input
                          type="number"
                          {...register(`invoiceItems[${index}].priceIncOfTax`)}
                          defaultValue={item.priceIncOfTax}
                          className="border border-gray-300 p-2"
                          />
                        <button type="button" onClick={() => remove(index)}>
                          Remove
                        </button>
                    
                   
                       

                  
                    </div>
                    </div>
                  </>
                ))}   
                    <button type="button" onClick={() => append({})}>
                      Add Item
                    </button>
                  
                     

          
  
            </div>
            <button type="submit" className="bg-green-600 hover:bg-green-400 rounded-lg self-end">
              GenerateInvoice
            </button>
          </form>
        </div>
      )}
      </>
  );
}

export default ConfirmOrder;