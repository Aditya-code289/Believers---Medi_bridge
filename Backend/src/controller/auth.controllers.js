import userModel from '../model/user.schema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../services/email.service.js';
import { generateotp , getOtphtml } from '../utils/otp.js';
import otpModel from '../model/otp.schema.js';


export async function Register(req,res) {

    const {username , email , password , mobileNumber , gender , hospitalName } = req.body ; 

    const isAlreadyRegistered = await  userModel.findOne({
        $or:[
            {username},{email}
        ]
    })

    if(isAlreadyRegistered){
        return res.status(409).json({
            messgae:"Username or Email already exist" 
        })
    }

    //now we create new user 
    // but first we hash password 

    const hashedPassword = await bcrypt.hash(password, 10);

    const  user = await userModel.create({
        username , email , password:hashedPassword , mobileNumber , gender , hospitalName 
    })

    //all the otp work i will be doing here 
    const otp = generateotp() ;
    const html = getOtphtml(otp);

    const otpHash = await bcrypt.hash(otp, 10) ; 
    
     await otpModel.create({
        email,
        user:user.id , 
        otpHash ,
     })

     await sendEmail(email , "OTP Verification " , `your OTP is ${otp}` , html )


    res.status(201).json({
        username:user.username,
        email:user.email,
        mobileNumber:user.mobileNumber,
        gender:user.gender,
        hospitalName:user.hospitalName,
        message:"user successfully registered but not verified",
        verified : user.verified ,
    })

    
}

export async function get_me(req,res){
    const token = await req.headers.authorization?.split(" ")[1];
     
    //this is how we verify json token 
    const decode = await jwt.verify(token,process.env.jwt_secret);

    if(!decode){
        return res.status(401).json({
            message:"you are Unauthorized user"
        })
    }

    const user = await userModel.findById(decode.id)
    res.status(200).json({
        username:user.username,
        email:user.email,   
    })
    




}

export async function login(req,res){
    const {email , password } = req.body ; 
    const user = await userModel.findOne({email});

    if(!user){
        return res.status(401).json({
            message:"user not found ",
        })
    }

    if(!user.verified){
        return res.status(401).json({
            message:"user not verified" ,
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const validPass = await bcrypt.compare(password, user.password);

    if(!validPass){
       return  res.status(401).json({
            message:"password is incorrect" , 
        })
    }


     
    

    const accessToken = jwt.sign({
        id:user._id
    },process.env.jwt_secret,{
        expiresIn:"15m",
    })

    const refreshToken = jwt.sign({
        id:user._id
    },process.env.jwt_secret,{
        expiresIn:"7d",
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:7*24*60*60*1000 //7 days
    })

    res.status(201).json({
        message:"User registered successefully" , 
        user:{
            uername:user.username,
            email:user.email,
        },accessToken
    })


}

export async function refreshToken (req,res) {
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({
            message:"you dont have refresh token ",
        })
    }

    const decode = await jwt.verify(refreshToken,process.env.jwt_secret);

    const accessToken = await jwt.sign({
        id:decode.id,
    },process.env.jwt_secret,{
        expiresIn:"15m"
    }
    )

    const newRefreshToken = await jwt.sign({
        id:decode.id,
    },process.env.jwt_Secret,{
        expiresIn:"7d",
    })

    res.cookie("refreshToken", newRefreshToken , {
        httpOnly:true,
        secure:true,
        sameSite:"strict" , 
        maxAge: 7 * 24 * 60 * 60 * 1000 //7 days 
    })
     res.status(200).json({
        message:"access token refreshed succesfully",
        accessToken,
     })

}

export async function verifyEmail(req,res) {
    const {otp , email } = req.body ;

    if(!otp && !email ){
        return res.status(401).json({
            message:"you can't remain otp section blank"
        })
    }


        const otpDoc = await otpModel.findOne({ email: email.trim() });
        console.log(otpDoc);

        if (!otpDoc) {
            return res.status(404).json({ message: "OTP not found or expired" });
        }

        // 3. Compare (Note: Ensure your schema field is otpHash or otp)
        const otpVerify = await bcrypt.compare(otp, otpDoc.otpHash);

        if (!otpVerify) {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        const user = await userModel.findByIdAndUpdate(otpDoc.user, {
            verified: true,
        }, { new: true }); // {new: true} returns the updated doc

        await otpModel.deleteMany({ email });

        return res.status(200).json({
            username: user.username,
            email: user.email,
            verified: user.verified,
            mobileNumber:user.mobileNumber,
            gender:user.gender,
            hospitalName:user.hospitalName,
            message: "User verified successfully",
        });





}
