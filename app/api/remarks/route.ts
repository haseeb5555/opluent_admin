import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/lib/utils";
import { connectToDB } from "@/lib/models/connection";
import { Remarks } from "@/lib/models/remarks.model";
export async function POST(req: NextRequest) {
    const {
        remark,
        poNo,
        email,
        status
    } = await req.json();
    const htmlContent = `
        <html>
            <head>
            <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            h1 {
                color: #333333;
                font-size: 24px;
                margin-top: 0;
            }

            p {
                color: #666666;
                font-size: 16px;
                line-height: 1.5;
                margin-bottom: 10px;
            }

            img {
                max-width: 100%;
                height: auto;
                margin-bottom: 20px;
            }
        </style>
            </head>
            <body>
                <div>
                    <img src="https://opulentfuels.com/wp-content/uploads/2023/07/of-logo-1-1536x558.png" alt="Opluent Fuel Logo" />
                    <h1>Order Rejection</h1>
                    <p>Dear Customer,</p>
                    <p>We regret to inform you that your order with PO number ${poNo} has been rejected.</p>
                    <p> ${remark}</p>
                    <p>Thank you for your understanding.</p>
                </div>
            </body>
        </html>
    `;

  const sendMail = async () => {
    
    const mailOptions = {
        from: "haseebmoon666@gmail.com",
        to: email,
        subject: "Order Rejection",
        html: htmlContent
    };
    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
  }
    await sendMail();
    await connectToDB();
    await Remarks.create({
        remark,
        poNo,
        email,
        status:"rejected"
    });

    return NextResponse.json({ message: "Remarks added" }, { status: 201 });
}

export async function GET() {
    await connectToDB();
    const remarks = await Remarks.find({}).exec();
    return NextResponse.json(remarks);
}