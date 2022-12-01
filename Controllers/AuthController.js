import bcrypt from "bcrypt";
import UserModel from '../Models/User.js';
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        // const password = req.body.password;
        // const salt = await bcrypt.genSalt(10);
        // const hash = await bcrypt.hash(password, salt);
        // const hash = await bcrypt.hash("12345678", salt);

        const doc = new UserModel({
            fullName: req.body.fullName,
            login: req.body.login,
            email: req.body.email,
            passwordHash: req.body.password,

            // fullName: "Taras Pravduc",
            // login: "taras",
            // email: "tarasp@gmail.com",
            // passwordHash: hash,
            // avatarUrl: "",
            // country: "Ukraine",
            // city: "Kiev",
            // birthday: "01.01.2001",
            // phoneNumber: "+3801122334455",
            // biography: "I am...",
        });

        await doc.save();
        res.status(200).json(doc)
        //
        // const token = jwt.sign(
        //     {
        //         _id: user._id,
        //     },
        //     'secret123',
        //     {
        //         expiresIn: '30d',
        //     },
        // );
        //
        // const { passwordHash, ...userData } = user._doc;
        //
        // res.json({
        //     ...userData,
        //     token,
        // });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const { passwordHash, ...userData } = user._doc;

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
