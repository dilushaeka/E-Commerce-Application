import {Document,Schema,model} from "mongoose";
import {SchemaType} from "mongoose";
import * as SchemaTypes from "../types/SchemaTypes"

const userSchema=new Schema<SchemaTypes.Iuser>({
    username:{type:String,required:true},
    fname:{type:String,required: true},
    lname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    // avatar:{
    //     public_id: {
    //         type: String,
    //         required: true,
    //     },
    //     url: {
    //         type: String,
    //         required: true,
    //     },
    // },
});

const UserModel=model("User",userSchema);

export default UserModel ;