import UserModel from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const EmailEX = [
    "@gmail.com",
    "@yahoo.com",
    "@hotmail.com",
    "@outlook.com"
]

export const login = async (req,res)=>{
    try {
        const {email , password } = req.body;

        if(!email || !password) return res.status(403).json({message:"Email and password required "});

        const finduser = await UserModel.findOne({email});

        if(finduser && bcrypt.compareSync(password , finduser.password)){
            const token = jwt.sign({userId:finduser._id } , "secret" , {expiresIn:'1d'});
            return res.status(200).json({ username:finduser.username, surname:finduser.surname , token , _id:finduser._id , profile_pic:finduser.profile_pic})
        }
        return res.status(400).json({message:"Invalied Email or Password "})
    } catch (error) {
        return res.status(403).json({message:error.message})
    }
}

export const register = async (req,res)=>{
    try {
        const {fullName, email, password, login} = req.body;

        if(!fullName || !email || !password  || !login){
            return res.status(403).json({message:"All fields required!!"});
        }

        if(!EmailEX.some(emailex => email.includes(emailex) )){
            return res.status(400).json({message:"Please Enter Valied Email !!"});
        }


        const findEmail = await UserModel.findOne({email})
        if(findEmail){
            return res.status(400).json({message:"This email already registed !!"})
        }


        const hashpass = bcrypt.hashSync(password , 10);

        let newUser = new UserModel({...req.body , password:hashpass});
        newUser = await newUser.save();


        if(!newUser) return res.status(500).json({message:"somethign went wrong "});
        return res.status(200).json({message:"Account created Successfully"});

    } catch (error) {
        return res.status(403).json({message:error})
    }
}
