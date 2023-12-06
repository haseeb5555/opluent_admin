import { NextRequest, NextResponse } from "next/server";


import fs from 'fs';




const carbone = require('carbone');
import { transporter } from "@/lib/utils";
import { Po } from "@/types";
import { connectToDB } from "@/lib/models/connection";
import { PO } from "@/lib/models/po.model";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
    let id =`PO-00${nanoid()}`;

  const {
    email,
    poDate,
    deleviryAddress,
    salesTaxRegNo,
    ntnNo,
    buyerName,
    address,
    contact,
    poItems
  }:Po=  await req.json();
  const poPdf = async () => {
    carbone.render("./templates/POFormat.docx",{
        poNo:id.slice(0,8).toString().toUpperCase(),
        poDate,
     
        deleviryAddress,
        salesTaxRegNo,
        ntnNo,
        buyerName,
        address,
        contact,
        poItems}
       , function (err: any, result: any) {
        if (err) {
            return console.log(err);
        }

        fs.writeFileSync('./templates/output/PO.docx', result);

       
        const mailOptions = {
            from: 'haseebmoon666@gmail.com',
            to: 'mh5510737@gmail.com',
            subject: 'Purchase Order PDF',
            text: 'Please find the attached PO PDF.',
            attachments: [
                {
                    filename: 'PO.docx',
                    path: './templates/output/PO.docx'
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

  await poPdf();
  await connectToDB();
  await PO.create({
    poNo:id.slice(0,8).toString().toUpperCase(),
    poDate,
    status:"pending",
    deleviryAddress,
    salesTaxRegNo,
    ntnNo,
    email,
    buyerName,
    address,
    contact,
   poItems
  });

return NextResponse.json({ message: "PO Created" }, { status: 201 });

}

export async function GET() {
  await connectToDB();
  const po = await PO.find({});
  return NextResponse.json({ po });
}   