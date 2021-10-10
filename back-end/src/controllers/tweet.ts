import { NextFunction, Response } from "express";
const { validationResult } = require("express-validator/check");
const Tweet = require("../models/tweet");

exports.getTweets = async (req: any, res: Response, next: NextFunction) => {
  const tweetData = await Tweet.find();
  res.status(200).json(tweetData);
};
exports.deleteTweet = async (req: any, res: Response, next: NextFunction) => {
  Tweet.findByIdAndDelete(req.body.id)
    .then((result: any) => res.status(200).json({ message: "Tweet Deleted" }))
    .catch((err: any) => console.log(err));
};
exports.createTweet = (req: any, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: any = new Error(
      "Validation failed, entered data is incorrect."
    );
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
  });
  post
    .save()
    .then((result: any) => {
      res.status(201).json({
        message: "Tweet created successfully!",
        post: result,
      });
    })
    .catch((err: any) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.previewTweetImage = (req: any, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: any = new Error(
      "Validation failed, entered data is incorrect."
    );
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error: any = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path.replace("\\", "/");
  res.status(200).json({
    message: "Preview Image",
    imageUrl: imageUrl,
  });
};
