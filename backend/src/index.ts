import express from 'express'
import bodyParser from "body-parser";
import mongoose from 'mongoose'
import UserModel from "./models/user.model";
import CustomResponse from "./dtos/custom.response";


const app=express();

app.use(bodyParser.json());

interface User {
    username:string,
    fname:string,
    lname:string,
    email:string,
    password:string,
}
let users:User[]=[];

mongoose.connect("mongodb://127.0.0.1:27017/e-commerce")
const db=mongoose.connection
db.on('error',(error)=>{
    console.log("bd error:  -"+error)
});
db.on('open',()=>{
    console.log("Db Is connected successful")
});

// ==================================================================================================
//                               User
// ==================================================================================================
//

//==================================get all users====================================================
app.get('/user/all', async (req:express.Request,res:express.Response) =>{
    try {
        let users= await UserModel.find();
        res.status(200).send(
            new CustomResponse(200,"Users Are Found success",users)
        )
    }catch (error){
        res.status(100).send("error get users")
    }

});

//=================================create new user====================================================
app.post('/user/register',async (req:express.Request, res:express.Response)=>{

    try {
        const  req_body:any=req.body;
        const userModel=new UserModel({
            username:req_body.username,
            fname:req_body.fname,
            lname:req_body.lname,
            email:req_body.email,
            password:req_body.password
        })
        await userModel.save();
        res.status(200).send(
            new CustomResponse(200,"User Created Successfully...!")
        )

    }catch (error){
        res.status(100).send("Error....")
    }

});

//================================= User Auth ====================================================



app.post('/user/auth',async (req:express.Request,res:express.Response)=>{
    try {
        let request_body=req.body

       let user= await UserModel.findOne({email:request_body.email});
        if(user){

            if(user.password=== request_body.password){

                res.status(200).send(

                    new CustomResponse(200,"Access",user)
                )
            }else {
                res.status(401).send(
                new CustomResponse(401,"Invalid credentials")
                );
            }
        }else {
            res.status(404).send(
                new CustomResponse(404,"user not found")
            );
        }

    }catch (error){
        res.status(100).send("Error"+error);
    }
});

// ==================================================================================================
//                               Products
// ==================================================================================================
//


app.post('/products',(req:express.Request,res:express.Response)=>{
    try {
        
    }catch (error){
        res.status(100).send("Error"+error);
    }
});

//===================================connect server===================================================
app.listen(8081,()=>{
    console.log("server is started")
});