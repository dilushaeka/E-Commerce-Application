

import express from "express";
import UserModel from "../models/user.model";
import CustomResponse from "../dtos/custom.response";
import * as SchemaTypes from "../types/SchemaTypes";

//Get All user
export const getAllUser=async (req: express.Request, res: express.Response) => {
    try {
        let users = await UserModel.find();
        res.status(200).send(
            new CustomResponse(200, "Users Are Found success", users)
        )
    } catch (error) {
        res.status(100).send("error get users")
    }

}

// Create New User

export const createUser=async (req: express.Request, res: express.Response) => {

    try {
        const req_body: any = req.body;
        const userModel = new UserModel({
            username: req_body.username,
            fname: req_body.fname,
            lname: req_body.lname,
            email: req_body.email,
            password: req_body.password
        })
        let user:SchemaTypes.Iuser|null=await userModel.save();

        if (user){
            user.password="";
            res.status(200).send(
                new CustomResponse(200, "User Created Successfully...!")
            )
        }else {
            res.status(100).send(
                new CustomResponse(100,"something went wrong")
            )
        }
    } catch (error) {
        res.status(100).send("Error....")
    }

}

