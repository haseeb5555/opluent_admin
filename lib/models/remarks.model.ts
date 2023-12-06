import mongoose from 'mongoose';


const remarksSchema = new mongoose.Schema({
    status:{
        type: String,
        required: true
    },
    remark: {
        type: String,
        required: true
    },
    poNo:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    
})
export const Remarks = mongoose.models.Remarks||mongoose.model('Remarks', remarksSchema);
