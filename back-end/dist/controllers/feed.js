"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const post_1 = __importDefault(require("../models/post"));
exports.getFeed = (req, res, next) => {
    res.status(200).json({ message: "hello tomato" });
};
exports.createToDo = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            status: 400,
            message: "failed to fetch data",
            errors: error.array(),
        });
    }
    const imageUrl = req.file.path;
    console.log(imageUrl);
    console.log("object");
    const title = req.body.title;
    const content = req.body.content;
    const post = new post_1.default({
        title: title,
        content: content,
        imageUrl: imageUrl,
    });
    post
        .save()
        .then((result) => {
        console.log("cretaed");
        res.status(201).json({
            message: "Post created successfully!",
            post: result,
        });
    })
        .catch((err) => console.log(err));
};
