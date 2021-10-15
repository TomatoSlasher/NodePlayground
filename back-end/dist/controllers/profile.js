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
// const { validationResult } = require("express-validator/check");
const express_validator_1 = require("express-validator");
const User = require("../models/user");
exports.followProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
    }
    console.log(req.body.profileId);
    const userDoc = yield User.findById(req.userId);
    userDoc.following.push(req.body.profileId);
    yield userDoc.save();
    const profileDoc = yield User.findById(req.body.profileId);
    profileDoc.followers.push(req.userId);
    yield profileDoc.save();
    res.status(200).json({
        message: `Profile Followed`,
    });
});
exports.getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
    }
    const username = req.params.profileName;
    const userData = yield User.findOne({ username: username }, { password: 0 }).populate("tweets");
    if (!userData) {
        return res.status(200).json({
            message: "user not found",
        });
    }
    res.status(200).json({
        message: `User ${userData.username}`,
        data: userData,
    });
});
