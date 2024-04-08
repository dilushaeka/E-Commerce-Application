
import express from "express";
import ProductModel from "../models/product.model";
import CustomResponse from "../dtos/custom.response";
import {verifyToken} from "../middlewares";
import productModel from "../models/product.model";
import UserModel from "../models/user.model";
import * as productController from "../controllers/product.controller"
import {getLoggerAllProducts} from "../controllers/product.controller";

const router=express.Router()



// ==================================================================================================
//                               Products
// ==================================================================================================
//

//================================= Products Create ====================================================


router.post('/save',verifyToken,productController.createProduct);


//================================= get All Products ====================================================

router.get('/all', productController.getAllProducts);


//================================= get All Products With User Name====================================================

router.get('/:username',productController.getAllProductsWithUserName)

//================================= get logger  all products ============================================
router.get('/get/my',verifyToken ,productController.getLoggerAllProducts)


//================================= Update products============================================
router.put('/',verifyToken,productController.updateProduct)

//================================= Delete products============================================
router.delete('/:id',verifyToken,async (req:express.Request,res:any)=>{
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

export default router;