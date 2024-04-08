//Get All user

import express from "express";
import UserModel from "../models/user.model";
import CustomResponse from "../dtos/custom.response";

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