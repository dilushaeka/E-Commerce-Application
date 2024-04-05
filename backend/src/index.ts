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




const app = express();

app.use(bodyParser.json());

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



//================================= User Auth ========================================================


app.post('/user/auth', async (req: express.Request, res: express.Response) => {
    try {
        let request_body = req.body

        let user:SchemaTypes.Iuser|null = await UserModel.findOne({email: request_body.email});
        if (user) {

            if (user.password === request_body.password) {

                //gen token
                user.password=""

                const expiresIn='1y'

                jwt.sign({user},process.env.SECRET as Secret,{expiresIn},(err:any,token:any)=>{
                    if (err){
                        res.status(100).send(
                            new CustomResponse(100,"Something Went Wrong")
                        )
                    }else {
                        let  res_body ={
                            user:user,
                            accessToken:token
                        }
                        res.status(200).send(
                            new CustomResponse(200, "Access", res_body)
                        )
                    }
                })
            } else {
                res.status(401).send(
                    new CustomResponse(401, "Invalid credentials")
                );
            }
        } else {
            res.status(404).send(
                new CustomResponse(404, "user not found")
            );
        }

    } catch (error) {
        res.status(100).send("Error" + error);
    }
});

// ==================================================================================================
//                               Products
// ==================================================================================================
//

//================================= Products Create ====================================================

// verify jwt token--
 const verifyToken=(req:express.Request,res:any,next:express.NextFunction)=>{
     const token=req.headers.authorization;
     if (!token){
         return res.status(401).json('invalid token')
     }

     try {
         const data = jwt.verify(token,process.env.SECRET as Secret)

         res.tokenData =data;
         // console.log(res.tokenData)
         next();
     }catch (error) {
         return res.status(401).json('invalid token');
     }
 }
 //----
app.post('/products/save',verifyToken,async (req: express.Request, res: any) => {
    try {
        let req_body = req.body;
        const productModel = new ProductModel({
            name: req_body.name,
            // id: req_body.id,
            category: req_body.category,
            description: req_body.description,
            originalPrice: req_body.originalPrice,
            // image: req_body.image,
            stock: req_body.stock,
            created: req_body.created,
            user: req_body.user


        })
        await productModel.save().then(r => {
            res.status(200).send(
                new CustomResponse(200, "product saved successfully",)
            )
        }).catch(e => {
            res.status(100).send(
                new CustomResponse(100, "Something Went Wrong")
            )
        });
    } catch (error) {
        res.status(100).send("Error : " + error);
    }
});
//================================= get All Products ====================================================

app.get('/products/all', async (req: express.Request, res: express.Response) => {

    try {

        let req_query:any=req.query;
        let size=req_query.size;
        let page=req_query.page;


        let documentCount= await productModel.countDocuments();
        let pageCount= Math.ceil(documentCount/size);
        let nextPages=Math.ceil(pageCount-page);


        let products = await ProductModel.find().limit(size).skip(size * (page - 1));
        res.status(200).send(
            new CustomResponse(200, "get All Products Are Successfully...!", products,pageCount,nextPages)
        )
    } catch (error) {
        res.status(404).send("Error :" + error);
    }
});

//================================= get All Products With User Name====================================================

app.get('/products/:username',async (req:express.Request,res:express.Response)=>{
    try {

        let username:string = req.params.username;


        let req_query:any=req.query;
        let size=req_query.size;
        let page=req_query.page;


        let documentCount= await productModel.countDocuments();
        let pageCount= Math.ceil(documentCount/size);
        let nextPages=Math.ceil(pageCount-page);


        let user:any= await  UserModel.findOne({username: username});

        if (!user){
            res.status(404).send(
                new CustomResponse(404,"User Not Found")
            )
        }else {
            let articles=await ProductModel.find({user: user._id}).limit(size).skip(size * (page - 1))
            res.status(200).send(
                new CustomResponse(200,"Products Are Found Successfully with user name", articles,pageCount,nextPages)
            )
        }
        // res.status(200).send(
        //     new CustomResponse(200,"Products Are Found Successfully")
        // )65d4ac0cc71b08b08ce269d9

    }catch (error){
        res.status(100).send("Error"+error);
    }
})


//================================= get logged  all my products============================================
app.get('/products/get/my',verifyToken ,async (req:express.Request,res:any) =>{
    try {
        let req_query:any=req.query;

        let size=req_query.size;
        let page=req_query.page;

        let user_id=res.tokenData.user._id;


        let articles=await ProductModel.find({user:user_id}).limit(size).skip(size*(page-1))

        let documentCount=await ProductModel.countDocuments({user: user_id})

        let pageCount= Math.ceil(documentCount/size);

        res.status(200).send(
            new CustomResponse(200,"Logger all Your products are Successfully loaded",articles,pageCount))
    }catch (error) {
        res.status(100).send("error"+error)
    }
})


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