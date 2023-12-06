import { connectToDB } from "@/lib/models/connection";
import { PO } from "@/lib/models/po.model";
import { revalidatePath } from "next/cache";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    const id =params.id;
    await connectToDB();
     const order =await PO.findOne({_id :  id});
     revalidatePath(`/confirm/${id}`)
    return NextResponse.json({order},{status:200})
    }

    export async function PUT(req:NextRequest,{params}:{params:{id:string}}){
        const id =params.id;
         const{status:status} = await req.json();
         await connectToDB();
         await PO.findByIdAndUpdate(id,{
                status:status
            
         })
         return NextResponse.json({message:"Updated"},{status:200})
     }