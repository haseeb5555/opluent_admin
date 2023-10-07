
import { connectToDB } from "@/lib/models/connection";
import { Product } from "@/lib/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,{params}:{params:{id:string}}){
   const id =params.id;
    const {newImage:image,newName:name,newQuantity:quantity,newCommodityType:commodityType,newPrice:price} = await req.json();
    await connectToDB();
    await Product.findByIdAndUpdate(id,{image,name,quantity,commodityType,price})
    return NextResponse.json({message:"Updated"},{status:200})
}

export async function GET(req:NextRequest,{params}:{params:{id:string}}){
const id =params.id;
await connectToDB();
 const product =await Product.findOne({_id :  id});
return NextResponse.json({product},{status:200})
}
