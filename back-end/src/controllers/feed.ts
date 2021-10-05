import { NextFunction, Response } from "express";
import { validationResult } from "express-validator/check";
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
  // Create post in db
  res.status(201).json({
    message: "Post created successfully!",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
