import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../Models/User.js';

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            fullName: req.body.fullName,
            login: req.body.login,
            email: req.body.email,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
            role: req.body.role,
            country: req.body.country,
            city: req.body.city,
            birthday: req.body.birthday,
            phoneNumber: req.body.phoneNumber,
            biography: req.body.biography,
        });

        const user = await doc.save();

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
            message: 'Не удалось зарегистрироваться',
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

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа1',
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await UserModel.updateOne(
            {
                _id: postId,
            },
            {
                email: req.body.email,
                fullName: req.body.fullName,
                avatarUrl: req.body.avatarUrl,
                passwordHash: hash,
                role: req.body.role,
                country: req.body.country,
                city: req.body.city,
                birthday: req.body.birthday,
                phoneNumber: req.body.phoneNumber,
                biography: req.body.biography,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const users = await UserModel.find().exec();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};

export const getOne = async (req, res) => {
    try{
        const userName = req.params.fullName;
        const user = await UserModel.findOne({fullName: userName})
        res.json (user)
    }catch (err){
        console.log(err)
        res.status(404).json({
            message: "error"
        })
    }
}