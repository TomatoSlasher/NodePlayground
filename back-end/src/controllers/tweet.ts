import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import { createBrotliCompress } from "zlib";
const Tweet = require("../models/tweet");
const User = require("../models/user");
exports.getTweets = async (req: any, res: Response, next: NextFunction) => {
  const tweetData = await Tweet.find();
  res.status(200).json(tweetData);
};
exports.deleteTweet = async (req: any, res: Response, next: NextFunction) => {
  const tweet = await Tweet.findById(req.body.id);
  if (tweet.creator != req.userId) {
    return res.status(200).json({ message: "not authorized to delete" });
  }
  await Tweet.findByIdAndDelete(req.body.id);

  const user = await User.findById(req.userId);
  user.tweets.pull(req.body.id);
  user
    .save()
    .then((result: any) => res.status(200).json({ message: "Tweet Deleted" }))
    .catch((err: any) => console.log(err));
};
exports.editTweet = async (req: any, res: Response, next: NextFunction) => {
  const tweet = await Tweet.findById(req.body.id);
  if (tweet.creator != req.userId) {
    return res.status(200).json({ message: "not authorized to edit" });
  }
  Tweet.findByIdAndUpdate(req.body.id, { content: req.body.content })
    .then((result: any) => res.status(200).json({ message: "Tweet Edited" }))
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
    creator: req.userId,
  });
  post
    .save()
    .then((result: any) => {
      return User.findById(req.userId);
    })
    .then((user: any) => {
      user.tweets.push(post);
      return user.save();
    })
    .then((user: any) => {
      res.status(201).json({
        message: "Tweet created successfully!",
        post: post,
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
