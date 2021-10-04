import { NextFunction, Response } from "express";

exports.getFeed = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "hello tomato" });
};
exports.createToDo = (req: any, res: Response, next: NextFunction) => {
  const title = req.body.title;
  const content = req.body.content;
  // Create post in db
  res.status(201).json({
    message: "Post created successfully!",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
