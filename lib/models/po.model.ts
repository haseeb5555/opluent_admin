import mongoose from "mongoose";

export const PoSchema = new mongoose.Schema({
    poNo:{
        type:String,
        required:true
    },
    poDate: {
        type: Date,
        required: true,
    },
    email:{
        type:String,
        required:true
    },
    deleviryAddress:{
        type:String,
        required:true
    },
   salesTaxRegNo:{
      type:String,
      required:true
   },
   status:{
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
    poItems: [{
        itemName: {
            type: String,
            required: true,
        },
        quantityOrdered: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
        ratePerUnit:{
            type:Number,
            required:false
        },
        priceExcOfTax:{
            type:Number,
            required:false
        },
        salesTax:{
            type:Number,
            required:false
        },
        priceIncOfTax:{
            type:Number,
            required:false
        },
    
        
        
    }],
    }
)

export const PO =mongoose.models.PO || mongoose.model("PO", PoSchema);