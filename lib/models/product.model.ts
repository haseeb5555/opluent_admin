import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
    image:String,
    name: String,
    quantity:String,
    commodityType:String,
    price:String
},
{
    timestamps:true
})

export const Product=mongoose.models.Product||mongoose.model('Product',productSchema)