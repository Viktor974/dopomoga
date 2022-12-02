import bcrypt from "bcrypt";
import UserModel from '../Models/User.js';
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const passwordHash = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(passwordHash, salt);
        // const hash = await bcrypt.hash("12345678", salt);

        const doc = new UserModel({
            fullName: req.body.fullName,
            login: req.body.login,
            email: req.body.email,
            password: hash,
            avatarUrl: req.body.avatarUrl,
            country: req.body.country,
            city: req.body.city,
            birthday: req.body.birthday,
            phoneNumber: req.body.phoneNumber,
            biography: req.body.biography,

            // fullName: "Taras Pravda",
            // login: "taras",
            // email: "taraspravda@gmail.com",
            // password: hash,
            // avatarUrl: "",
            // country: "Ukraine",
            // city: "Kiev",
            // birthday: "01.01.2001",
            // phoneNumber: "+3801122334455",
            // biography: "I am...",
        });

        const user = await doc.save();
        // res.status(200).json(user)


        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const { password, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Невдалося зареєструватися",
        });
    }
};

export const login = async (req, res) => {
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
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const { password, updatedAt, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
};
