

import mongoose from "mongoose";


const quotationSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
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
    quotationItems: [{
        itemName: {
            type: String,
            required: true,
        },
        quantityQuoted: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
    }],
    }

 
);

export const Quotation = mongoose.models.Quotation || mongoose.model("Quotation", quotationSchema);