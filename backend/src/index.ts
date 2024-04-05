import dotenv from 'dotenv';
dotenv.config();
import * as process from 'process';

import express from 'express'
import bodyParser from "body-parser";
import mongoose, {Schema} from 'mongoose'

import UserModel from "./models/user.model";
import CustomResponse from "./dtos/custom.response";
import ProductModel from "./models/product.model";
import productModel from "./models/product.model";
import * as  SchemaTypes from "./types/SchemaTypes"

import jwt, {Secret} from "jsonwebtoken"
import UserRoutes from "./routes/user.routes";




const app = express();

app.use(bodyParser.json());


//------------------user--------------------------
app.use('/user',UserRoutes)

//------------------product--------------------------
interface User {
    username: string,
    fname: string,
    lname: string,
    email: string,
    password: string,
}

let users: User[] = [];

mongoose.connect(process.env.MONGO_URL as string)
const db = mongoose.connection
db.on('error', (error) => {
    console.log("DB error:---" + error)
});
db.on('open', () => {
    console.log("Db Is connected successful..")
});











//===================================connect server===================================================
app.listen(8081, () => {
    console.log("server is started")
});