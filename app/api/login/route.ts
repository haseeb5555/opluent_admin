import { NextRequest, NextResponse } from "next/server";
import { UserT } from "../signup/route";
import { connectToDB } from "@/lib/models/connection";
import { User } from "@/lib/models/user.model";

export async function POST(req:NextRequest,res:NextResponse){
    const{name,email,password,contactNo,address,ntn}:UserT= await req.json()
    await connectToDB();
   const user= await User.findOne({email})
   if(!user){
    return NextResponse.json({message:"user not found"},{status:404})
   }
   if(user.password!==password){
    return NextResponse.json({message:"wrong password"},{status:501});
   }
   if(user.password===password)
   return NextResponse.json({message:'login successfuly'})
}