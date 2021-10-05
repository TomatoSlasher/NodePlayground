"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
exports.getFeed = (req, res, next) => {
    res.status(200).json({ message: "hello tomato" });
};
exports.createToDo = (req, res, next) => {
    const error = (0, check_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            status: 400,
            message: "failed to fetch data",
            errors: error.array(),
        });
    }
    const title = req.body.title;
    const content = req.body.content;
    // Create post in db
    res.status(201).json({
        message: "Post created successfully!",
        post: { id: new Date().toISOString(), title: title, content: content },
    });
};
