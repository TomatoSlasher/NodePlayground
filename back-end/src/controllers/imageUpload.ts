import { NextFunction, Response } from "express";
import { validationResult } from "express-validator/check";
import Post from "../models/post";

exports.createImage = (req: any, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        status: 400,
        message: "failed to fetch data",
        errors: error.array(),
      });
    }
  console.log(req.file);
    const imageUrl = req.file.path.replace("\\" ,"/");

  const post = new Post({
    imageUrl: imageUrl,
  });
  post
    .save()
    .then((result: any) => {
      res.status(201).json({
        message: "image created successfully!",
        post: result,
      });
    })
    .catch((err: any) => console.log(err));
};