import mongoose from "mongoose";

export const InvoiceSchema = new mongoose.Schema({
    invoiceNo:{
        type:String,
        required:true
    },
    invoiceDate: {
        type: Date,
        required: true,
    },
    email:{
        type:String,
        required:true
    },
    deliveryAddress:{
        type:String,
        required:true
    },
   salesTaxRegNo:{
      type:String,
      required:true
   },
   ntnNo:{
         type:String,
         required:true
    },
    buyerName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    invoiceItems: [{
        itemName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
        ratePerUnit:{
            type:Number,
            required:true
        },
        priceExcOfTax:{
            type:Number,
            required:true
        },
        salesTax:{
            type:Number,
            required:true
        },
        priceIncOfTax:{
            type:Number,
            required:true
        },
    }],
})

export const Invoice = mongoose.models.Invoice || mongoose.model("Invoice", InvoiceSchema);
