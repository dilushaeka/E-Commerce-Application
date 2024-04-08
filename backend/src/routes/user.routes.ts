import express from "express";
import UserModel from "../models/user.model";
import CustomResponse from "../dtos/custom.response";
import * as  SchemaTypes from "../types/SchemaTypes"
import jwt, {Secret} from "jsonwebtoken"
import * as UserController from "../controllers/user.controller";

 const router = express.Router();


// ==================================================================================================
//                               User
// ==================================================================================================
//

//==================================get all users====================================================

router.get('/all',UserController.getAllUser );

//=================================create new user====================================================
router.post('/register', );

//================================= User Auth ========================================================


router.post('/auth', async (req: express.Request, res: express.Response) => {
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

export default router;