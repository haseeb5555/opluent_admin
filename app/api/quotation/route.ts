import { connectToDB } from "@/lib/models/connection";
import { Quotation } from "@/lib/models/quotation.model";
import { IQuotation } from "@/types";
import { revalidatePath } from "next/cache";
import { transporter } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
const carbone = require('carbone');



export async function POST(req: NextRequest) {
    const { date, buyerName, address, contact, quotationItems }: IQuotation = await req.json();

    const quotationPdf = async () => {
        carbone.render("./templates/Quotation.docx", { date, buyerName, address, contact, quotationItems }, function (err: any, result: any) {
            if (err) {
                return console.log(err);
            }

            fs.writeFileSync('./templates/output/newDoc.docx', result);

            
            const mailOptions = {
                from: 'haseebmoon666@gmail.com',
                to: 'mh5510737@gmail.com',
                subject: 'Quotation PDF',
                text: 'Please find the attached quotation PDF.',
                attachments: [
                    {
                        filename: 'newDoc.docx',
                        path: './templates/output/newDoc.docx'
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

    await quotationPdf();
    await connectToDB();
    await Quotation.create({
        date,
        buyerName,
        address,
        contact,
        quotationItems,
    });
    revalidatePath("/");
    return NextResponse.json({ message: "Quotation Created" }, { status: 201 });
}

export async function GET() {
    await connectToDB();
    const quotation = await Quotation.find();
    return NextResponse.json({ quotation });
}
