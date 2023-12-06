import { transporter } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import { connectToDB } from "@/lib/models/connection";
import { Invoice } from "@/lib/models/invoice.model";
import { nanoid } from "nanoid";
const carbone = require('carbone');


let id =`INV${nanoid()}`
export async function POST(req:NextRequest){
    const {
        invoiceNo,
        invoiceDate,
        email,
        deliveryAddress,
        salesTaxRegNo,
        status,
        ntnNo,
        buyerName,
        address,
        contact,
        invoiceItems
    }=await req.json()

    const InvoicePdf = async () => {
        carbone.render("./templates/InvoiceFormat.docx",{
            invoiceNo:id.slice(3,8).toString().toUpperCase(),
            invoiceDate,
            email,
            deliveryAddress,
            salesTaxRegNo,
            status,
            ntnNo,
            buyerName,
            address,
            contact,
            invoiceItems}
           , function (err: any, result: any) {
            if (err) {
                return console.log(err);
            }
    
            fs.writeFileSync('./templates/output/Invoice.docx', result);
    
           
            const mailOptions = {
                from: 'haseebmoon666@gmail.com',
                to: email,
                subject: 'Invoice PDF',
                text: 'Please find the attached Invoice PDF.',
                attachments: [
                    {
                        filename: 'InvoiceFormat.docx',
                        path: './templates/output/Invoice.docx'
                    }
                ]
            };
    
            transporter.sendMail(mailOptions, function (error: any, info: any) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });
    }
    await InvoicePdf();
    await connectToDB();
    await Invoice.create({
        invoiceNo:id.slice(3,8).toString().toUpperCase(),
        invoiceDate,
        email,
        deliveryAddress,
        salesTaxRegNo,
        status:"success",
        ntnNo,
        buyerName,
        address,
        contact,
        invoiceItems
    })
    return NextResponse.json({message:"Invoice Created"},{status:201})

}
export async function GET(){
    await connectToDB();
    const invoices=await Invoice.find();
    return NextResponse.json(invoices,{status:200})
}