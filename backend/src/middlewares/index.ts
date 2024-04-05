import express from "express";
import jwt, {Secret} from "jsonwebtoken";
import process from "process";

// verify jwt token--
export const verifyToken=(req:express.Request,res:any,next:express.NextFunction)=>{
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
