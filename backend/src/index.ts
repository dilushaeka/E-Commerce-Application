import dotenv from 'dotenv';
dotenv.config();
import * as process from 'process';

import express from 'express'
import bodyParser from "body-parser";
import mongoose, {Schema} from 'mongoose'


import UserRoutes from "./routes/user.routes";
import ProductRoutes from "./routes/product.routes"



const app = express();

app.use(bodyParser.json());


//------------------user--------------------------
app.use('/user',UserRoutes)

//------------------product--------------------------
app.use('/products',ProductRoutes)

//db


mongoose.connect(process.env.MONGO_URL as string)
const db = mongoose.connection
db.on('error', (error) => {
    console.log("DB error:---" + error)
});
db.on('open', () => {
    console.log("Db Is connected successful..")
});


//=============================================
interface User {
    username: string,
    fname: string,
    lname: string,
    email: string,
    password: string,
}

let users: User[] = [];



//===================================connect server===================================================
app.listen(8081, () => {
    console.log("server is started")
});