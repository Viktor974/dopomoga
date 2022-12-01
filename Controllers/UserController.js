import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../Models/User.js';

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const {passwordHash, ...userData} = user._doc;

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
        if (req.body.userId === req.params.id || req.params.isAdmin) {
            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt("secret123")
                    req.body.password = await bcrypt.hash(req.body.password, salt)
                } catch (e) {
                    return res.status(500).json("error")
                }
            }
            try {
                const user = await UserModel.findByIdAndUpdate(req.password._id, {
                    $set: req.body
                })
                res.status(200).json("updated")
            }catch (e){
                return res.status(500).json("error")
            }
        } else {
            return res.status(403).json("error")
        }

        await UserModel.updateOne(
            {
                _id: userId,
            },
            {
                email: req.body.email,
                fullName: req.body.fullName,
                avatarUrl: req.body.avatarUrl,
                login: req.body.login,
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
    try {
        const userName = req.params.fullName;
        const user = await UserModel.findOne({fullName: userName})
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "error"
        })
    }
}