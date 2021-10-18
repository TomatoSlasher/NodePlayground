"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
exports.loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const userEmail = yield User.findOne({ email: email });
    const doMatch = userEmail
        ? yield bcrypt.compare(password, userEmail.password)
        : null;
    if (!userEmail) {
        return res.status(200).json({
            message: "user doesn't exist",
        });
    }
    if (userEmail.email != email || !doMatch) {
        return res.status(200).json({
            message: "Invalid E-mail or Password",
        });
    }
    if (userEmail.email == email && doMatch) {
        const token = jwt.sign({
            email: userEmail.email,
            userId: userEmail._id.toString(),
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).json({
            token: token,
            userId: userEmail._id.toString(),
            username: userEmail.username,
        });
    }
});
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed, entered data is incorrect.");
            error.statusCode = 422;
            throw error;
        }
        const username = req.body.username.toLowerCase().replace(/ /g, "");
        const email = req.body.email;
        const password = req.body.password;
        const encryptedPassowrd = yield bcrypt.hash(password, 12);
        const userEmail = yield User.findOne({ email: email });
        const userUsername = yield User.findOne({ username: username });
        if (userEmail) {
            return res.status(200).json({
                message: "user email already exists",
            });
        }
        if (userUsername) {
            return res.status(200).json({
                message: "username already exists",
            });
        }
        const user = new User({
            username: username,
            email: email,
            password: encryptedPassowrd,
        });
        user
            .save()
            .then(() => {
            res.status(200).json({
                message: "user created",
                res: { email: req.body.email },
            });
        })
            .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    }
    catch (error) {
        console.log(error);
    }
});
