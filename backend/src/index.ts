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









//================================= Update products============================================
app.put('/products/',verifyToken,async (req:express.Request,res:any)=>{
    try {

        let req_body:any=req.body;

        let user_id=res.tokenData.user._id;

        let product= await ProductModel.find({_id:req_body.id,user:user_id})

        console.log(product)
        if (product){
            await productModel.findOneAndUpdate({_id:req_body.id},{
                name: req_body.name,
                // id: req_body.id
                category: req_body.category,
                description: req_body.description,
                originalPrice: req_body.originalPrice,
                // image: req_body.image,
                stock: req_body.stock,
                created: req_body.created,
                user: req_body.user
            })
                .then( r=>{
                    res.status(200).send(
                        new CustomResponse(200,"Product Updated Successfully")
                    )
            }).catch( error =>{
                    console.log(error)
                res.status(100).send(
                    new CustomResponse(100,"Something Went wrong")
                )
            })
        }else {
            res.status(401).send(
                new CustomResponse(401,"Access Denied")
            )
        }
    }catch (error){
        res.status(100).send("error"+error)
    }
})

//================================= Delete products============================================
app.delete('/products/:id',verifyToken,async (req:express.Request,res:any)=>{
    console.log("came")
    try {
        let user_id=res.tokenData.user._id;
        console.log(user_id)
        let product_id:string=req.params.id;
        console.log("product_id"+product_id)

        let product=await ProductModel.find({_id:product_id,user:user_id})
        console.log(product)
        if (product){
            productModel.deleteOne({_id: product_id}).
            then(r=>{
                res.status(200).send(
                    new CustomResponse(200,"Product deleted Successfully")
                )
            }).catch(r=>{
                res.status(100).send(
                    new CustomResponse(100,"Something Went Wrong")
                )
            })
        }else {
            res.status.send(
                new CustomResponse(401,"Access Denied")
            )
        }
    }catch (error) {
        res.status(100).send("error"+error)
    }
});
//===================================connect server===================================================
app.listen(8081, () => {
    console.log("server is started")
});