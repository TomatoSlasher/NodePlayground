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
const Tweet = require("../models/tweet");
const User = require("../models/user");
exports.getTweets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetData = yield Tweet.find();
    res.status(200).json(tweetData);
});
exports.deleteTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = yield Tweet.findById(req.body.id);
    if (tweet.creator != req.userId) {
        return res.status(200).json({ message: "not authorized to delete" });
    }
    yield Tweet.findByIdAndDelete(req.body.id);
    const user = yield User.findById(req.userId);
    user.tweets.pull(req.body.id);
    user
        .save()
        .then((result) => res.status(200).json({ message: "Tweet Deleted" }))
        .catch((err) => console.log(err));
});
exports.editTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = yield Tweet.findById(req.body.id);
    if (tweet.creator != req.userId) {
        return res.status(200).json({ message: "not authorized to edit" });
    }
    Tweet.findByIdAndUpdate(req.body.id, { content: req.body.content })
        .then((result) => res.status(200).json({ message: "Tweet Edited" }))
        .catch((err) => console.log(err));
});
exports.createTweet = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
    }
    let imageUrl = "";
    if (req.file) {
        imageUrl = req.file.path.replace("\\", "/");
    }
    const content = req.body.content;
    const post = new Tweet({
        content: content,
        imageUrl: imageUrl,
        creator: req.userId,
    });
    post
        .save()
        .then((result) => {
        return User.findById(req.userId);
    })
        .then((user) => {
        user.tweets.push(post);
        return user.save();
    })
        .then((user) => {
        res.status(201).json({
            message: "Tweet created successfully!",
            post: post,
        });
    })
        .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};
exports.previewTweetImage = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        throw error;
    }
    if (!req.file) {
        const error = new Error("No image provided.");
        error.statusCode = 422;
        throw error;
    }
    const imageUrl = req.file.path.replace("\\", "/");
    res.status(200).json({
        message: "Preview Image",
        imageUrl: imageUrl,
    });
};
