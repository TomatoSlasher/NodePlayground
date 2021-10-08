"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const Post = require("../models/post");
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
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
    });
    post
        .save()
        .then((result) => {
        res.status(201).json({
            message: "Post created successfully!",
            post: result,
        });
    })
        .catch((err) => console.log(err));
};
