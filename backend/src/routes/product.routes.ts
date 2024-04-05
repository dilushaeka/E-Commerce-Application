
import express from "express";
import ProductModel from "../models/product.model";
import CustomResponse from "../dtos/custom.response";
import router from "./user.routes";
import {verifyToken} from "../middlewares";






// ==================================================================================================
//                               Products
// ==================================================================================================
//

//================================= Products Create ====================================================


router.post('/products/save',verifyToken,async (req: express.Request, res: any) => {
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