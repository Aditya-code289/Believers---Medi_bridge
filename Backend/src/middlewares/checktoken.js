import gettoken from "../controller/token.controller.js"

const checktoken = async (req , res , next)=>{
        try {
            const token = await gettoken();
            
            if(!token){
                res.status(401).json({message:"token not available"}) ; 
            }
            req.token=token;
            console.log("token verified");
            next();
        } catch (error) {
            console.error(error.message);   
        }
}

export default  checktoken ; 