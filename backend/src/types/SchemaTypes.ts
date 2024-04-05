import {Document, ObjectId} from "mongoose";

export interface IProduct extends Document{
    name:string,
    // id:number,
    category:string,
    description:string,
    originalPrice:number,
    // image:string,
    created:Date,
    stock:number,
    user:ObjectId,

}

export interface Iuser extends Document{
    username:string,
    fname:string,
    lname:string,
    email:string,
    password:string,
    avatar:string,
}