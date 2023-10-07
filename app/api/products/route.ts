
import { connectToDB } from "@/lib/models/connection";
import { Product } from "@/lib/models/product.model";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req:NextRequest){

const {image,name,quantity,commodityType,price}= await req.json()
await connectToDB();
await Product.create({image,name,quantity,commodityType,price})
return NextResponse.json({message:"Product Created"},{status:201})
}

export async function GET(){
    await connectToDB();
    const product= await Product.find()
    
    revalidatePath("/api/products")
    return NextResponse.json({product})
}

export async function DELETE (req:NextRequest){
    await connectToDB();
    const id =req.nextUrl.searchParams.get('id')
    await Product.findByIdAndDelete(id);
    return NextResponse.json({message:"Product deleted"},{status:201})
}