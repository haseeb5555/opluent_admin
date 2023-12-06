import { connectToDB } from "@/lib/models/connection";
import { User } from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";

 export type UserT ={
    name?:string;
    email:string;
    password:string;
    contactNo?:string;
    address?:string;
    ntn?:string;
}

export async function POST(req:NextRequest){
    const {name,email,password,contactNo,address,ntn}:UserT =await req.json()
    await connectToDB();
    await User.create({
        name,email,password,contactNo,address,ntn 
    })

    return NextResponse.json({message:"User Created Successfully"},{status:201})
}