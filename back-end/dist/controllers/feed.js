"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeed = (req, res, next) => {
    res.status(200).json({ message: "hello tomato" });
};
exports.createToDo = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    // Create post in db
    res.status(201).json({
        message: "Post created successfully!",
        post: { id: new Date().toISOString(), title: title, content: content },
    });
};
