import UserModel from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const login = async (req,res)=>{
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        !user && res.status(404).json({message: 'Пользователь не найден'});

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);
        !isValidPass && res.status(400).json({message: 'Неверный логин или пароль'});

        // res.status(200).json(user)
        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret'
        );

        const { password, updatedAt, ...userData } = user._doc;

        res.cookie("accessToken", token,{
            httpOnly: true,
        }).status(200).json(userData)


        // res.json({
        //     ...userData,
        // });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
}

export const register = async (req,res)=>{
    try {
        const salt = bcrypt.genSaltSync(10)
        const passwordHash = bcrypt.hashSync(req.body.password, salt)
        // const passwordHash = bcrypt.hashSync("12345678", salt)

        const doc = new UserModel({
            fullName: req.body.fullName,
            login: req.body.login,
            email: req.body.email,
            password: passwordHash,
            avatarUrl: req.body.avatarUrl,
            country: req.body.country,
            city: req.body.city,
            birthday: req.body.birthday,
            phoneNumber: req.body.phoneNumber,
            biography: req.body.biography,

            // fullName: "Taras Pravda",
            // login: "taras",
            // email: "taraspravda@gmail.com",
            // password: passwordHash,
            // avatarUrl: "",
            // country: "Ukraine",
            // city: "Kiev",
            // birthday: "01.01.2001",
            // phoneNumber: "+3801122334455",
            // biography: "I am...",
        });

        const user = await doc.save();



        const { password, ...userData } = user._doc;

        res.json({
            ...userData,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error",
        });
    }
}

export const logout = async (req,res)=>{
    res.clearCookie("accessToken",{
        secure:true,
            sameSite: "none",
    }).status(200).json("User has been logged out.")
}