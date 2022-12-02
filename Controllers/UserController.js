import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../Models/User.js';
import User from "../Models/User.js";

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const {password, ...userData} = user._doc;

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
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10)
                    req.body.password = await bcrypt.hash(req.body.password, salt)
                } catch (e) {
                    return res.status(500).json("error3")
                }
            }
            try {
                const user = await UserModel.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                })
                res.status(200).json("updated")
            }catch (e){
                return res.status(500).json("error1")
            }
        } else {
            return res.status(403).json("error2")
        }
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            try {
                const user = await UserModel.findByIdAndDelete({_id: req.params.id})
                res.status(200).json("Deleted")
            }catch (e){
                return res.status(500).json("error1")
            }
        } else {
            return res.status(403).json("error2")
        }
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
        const {password, updatedAt, ...other} = users._doc
        res.json(other);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'error',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        const {password, updatedAt, ...other} = user._doc
        res.status(200).json(other)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            message: "error"
        })
    }
}
export const follow = async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await UserModel.findById(req.params.id)
            const currentUser = await UserModel.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers: req.body.userId}})
                await currentUser.updateOne({$push:{followings: req.body.userId}})
                res.status(200).json("you has been followed")
            }else{
                res.status(403).json("You allready follow")
            }
        }catch (e) {
            res.status(500).json("error")
        }
    }else{
        res.status(404).json({
            message: "error"
        })
    }
}
export const unfollow = async (req,res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await UserModel.findById(req.params.id)
            const currentUser = await UserModel.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers: req.body.userId}})
                await currentUser.updateOne({$pull:{followings: req.body.userId}})
                res.status(200).json("you has been unfollowed")
            }else{
                res.status(403).json("You dont un follow")
            }
        }catch (e) {
            res.status(500).json("error")
        }
    }else{
        res.status(404).json({
            message: "You can't unfollow yourself"
        })
    }
}