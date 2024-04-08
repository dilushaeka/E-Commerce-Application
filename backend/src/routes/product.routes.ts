
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
router.delete('/:id',verifyToken,productController.deleteProducts);

export default router;