import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import Post from "../models/post";

exports.getFeed = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "hello tomato" });
};
exports.createToDo = (req: any, res: Response, next: NextFunction) => {
  const error = validationResult(req);
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
    .then((result: any) => {
      console.log("cretaed");
      res.status(201).json({
        message: "Post created successfully!",
        post: { id: new Date().toISOString() },
      });
    })
    .catch((err: any) => console.log(err));
};
