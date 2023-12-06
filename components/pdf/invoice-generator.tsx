"use client"


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm ,useFieldArray} from "react-hook-form"
import { z } from "zod"
import { Input } from "../ui/input"
import { Po } from "@/types"


import { useState } from 'react';
import { ScrollArea } from "../ui/scroll-area"


export function InvoiceDialog() {
  
  
    const schema = z.object({

      
      poDate: z.string().min(2, "PO date is required"),
      deleviryAddress: z.string().min(1, "Delivery address is required"),
      salesTaxRegNo: z.string().min(1, "Sales tax registration number is required"),
      ntnNo: z.string().min(1, "NTN number is required"),
      buyerName: z.string().min(1, "Buyer name is required"),
      address: z.string().min(1, "Address is required"),
      contact: z.string().min(1, "Contact is required"),
      poItems: z
        .array(
          z.object({
            itemName: z.string().min(1, "Item name is required"),
            quantityOrdered: z.number().min(1, "Quantity ordered is required"),
            unit: z.string().min(1, "Unit is required"),
            ratePerUnit: z.number().optional(),
            priceExcOfTax: z.number().optional(),
            salesTax: z.number().optional(),
            priceIncOfTax: z.number().optional(),
          })
        )
        .nonempty("At least one PO item is required"),
      })
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {

      poDate: "",
      deleviryAddress: "",
      salesTaxRegNo: "",
      ntnNo: "",
      buyerName: "",
      address: "",
      contact: "",
      poItems: [
        {
          itemName: "",
          quantityOrdered: 0,
          unit: "",
          ratePerUnit: 0,
          priceExcOfTax: 0,
          salesTax: 0,
          priceIncOfTax: 0,
        },
      ],
    },
  })
  const { control, register} = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "poItems",
  });
  

  const onSubmit = (values) => {
    console.log(values)
    form.reset()
  }
  return (
    
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Confirm Order</Button>
      </DialogTrigger>
      <DialogContent  >
        <DialogHeader>
          <DialogTitle>Invoice</DialogTitle>
          <DialogDescription>
            Generate invoice for customer.
          </DialogDescription>
        </DialogHeader>
      <ScrollArea className="h-72 w-58 rounded-md border" >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-4">

             <div className="w-full flex gap-2 max-sm:flex-col max-sm:w-full">

            <FormField
              control={form.control}
              name="poDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PO Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" className="w- [250px] border border-gray-300 rounded-md" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deleviryAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Address</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full border border-gray-300 rounded-md" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             </div>
            <FormField
              control={form.control}
              name="salesTaxRegNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sales Tax Registration Number</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full border border-gray-300 rounded-md" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ntnNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NTN Number</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full border border-gray-300 rounded-md" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buyerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buyer Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full border border-gray-300 rounded-md" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full border border-gray-300 rounded-md" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full border border-gray-300 rounded-md" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 

                <div>
                <label>PO Items</label>
                {fields.map((item, index) => (
                  <div key={item.id} className="flex gap-2">
                    <Input {...register(`poItems.${index}.itemName`)} placeholder="Item Name" />
                    <Input {...register(`poItems.${index}.quantityOrdered`)} placeholder="Quantity Ordered" type="number" />
                    {/* ... other fields for PO item ... */}
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => append({})}>
                  Add Item
                </button> 
                       
               </div>
            <DialogFooter>
              <Button type="submit" className="bg-green-600 hover:bg-green-400 rounded-lg">GenerateInvoice</Button>
            </DialogFooter>
          </form>
        </Form>
      </ScrollArea>
        
      </DialogContent>
    </Dialog>
  )
}






