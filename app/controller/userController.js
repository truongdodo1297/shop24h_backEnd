var mongoose = require("mongoose");
const userModel = require("../model/userModel");
const jwt = require('jwt-simple');
const secret = 'secretKey';

const getAllUser = (req, res) => {
    userModel.find((err, data) => {
        if (err) {
            return res.status(500).json({
                status: "Internal server error",
                message: err.message
            })
        }
        return res.status(200).json({
            status: "get all user",
            data: data
        })
    })
}

const login = async (req, res) => {
    let bodyUser = req.body
    const userName = bodyUser.userName;
    const passWord = bodyUser.passWord;

    let isUser = await userModel.findOne({ userName: userName, passWord: passWord })
    if (isUser !== null) {
        const token = jwt.encode({}, secret);
        return res.json({
            token: token,
            data: isUser,
            success: true
        });
    }
    else {
        return res.json({
            success: false
        });
    }
}

const createUser = async (req, res) => {
    try {
        let bodyUser = req.body
        // console.log(req)
        let user = {
            userName: bodyUser.userName,
            passWord: bodyUser.passWord,
            isAdmin: bodyUser.isAdmin,
            email: bodyUser.email,
            phone: bodyUser.phone,
        }

        let isAcount = await userModel.findOne({ userName: bodyUser.userName, email: bodyUser.email })
        if (isAcount) {
            return res.json({
                success: false,
                message: "Tài khoản hoặc email đã tồn tại"
            })
        }
        else {
            userModel.create(user, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        status: "Internal server error",
                        message: err.message
                    })
                }
                return res.status(201).json({
                    success: true
                })
            })
        }

    }
    catch (err) {
        return res.json({
            massage: err
        })
    }
}

module.exports = {
    getAllUser,
    createUser,
    login
}