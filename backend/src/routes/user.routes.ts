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
router.post('/register', UserController.createUser);

//================================= User Auth ========================================================


router.post('/auth', UserController.authUser);

export default router;