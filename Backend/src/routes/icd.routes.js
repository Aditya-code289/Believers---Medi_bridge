import express from "express"
import  checktoken  from "../middlewares/checktoken.js"
import dotenv from "dotenv"
import Search from "../controller/search.controllers.js"
import getBulkICDCodes from "../controller/icdCode.controllers.js"

const icdRouter = express.Router();

dotenv.config({ path: './.env' })


//post 
// /api/icd/search 
icdRouter.post('/search', checktoken , Search) ;

//post
// /api/icd/codes
icdRouter.post('/codes', checktoken , getBulkICDCodes) ;

export default icdRouter