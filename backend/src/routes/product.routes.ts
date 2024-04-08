
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
router.get('/get/my',verifyToken ,getLoggerAllProducts)


//================================= Update products============================================
router.put('/',verifyToken,async (req:express.Request,res:any)=>{
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