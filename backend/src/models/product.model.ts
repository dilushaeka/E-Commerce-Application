import mongoose, {model, ObjectId, Schema} from "mongoose";
import * as SchemaTypes from "../types/SchemaTypes"

const productSchema=new mongoose.Schema<SchemaTypes.IProduct>(
    {
        name: {type: String, required: true},
        // id:{type:Number,required:true},
        category: {type: String, required: true},
        description: {type: String, required: true},
        originalPrice: {type: Number, required: true},
        // image: {
        //     publicId: {
        //         type: String, required: true,
        //     },
        //     url: {
        //         type: String, required: true,
        //     },
        // },
        stock: {
            type: Number,
            required: [true, "Please enter your product stock!"],
        },
        created: {
            type: Date, required: true,
            default: Date.now(),
        },
        user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
    }
);

const ProductModel=mongoose.model('Product',productSchema);
export default ProductModel;