"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = __importDefault(require("../models/post"));
exports.createImage = (req, res, next) => {
    //   const error = validationResult(req);
    //   if (!error.isEmpty()) {
    //     return res.status(422).json({
    //       status: 400,
    //       message: "failed to fetch data",
    //       errors: error.array(),
    //     });
    //   }
    console.log(req.file);
    const imageUrl = req.file.path;
    const post = new post_1.default({
        imageUrl: imageUrl,
    });
    post
        .save()
        .then((result) => {
        res.status(201).json({
            message: "image created successfully!",
            post: result,
        });
    })
        .catch((err) => console.log(err));
};
