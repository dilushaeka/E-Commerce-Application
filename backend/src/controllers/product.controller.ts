

import express from "express";
import ProductModel from "../models/product.model";
import CustomResponse from "../dtos/custom.response";
import productModel from "../models/product.model";

// get All Product
export const getAllProducts=async (req: express.Request, res: express.Response) => {

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
}

// Create Product
export const createProduct=async (req: express.Request, res: any) => {
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
}