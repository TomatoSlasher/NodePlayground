import { NextFunction, Response } from "express";
const { validationResult } = require("express-validator/check");
const User = require("../models/user");

exports.createUser = async (req: any, res: Response, next: NextFunction) => {
  //   const tweetData = await Tweet.find();
  res.status(200).json({
    message: "user created",
    res: { email: req.body.email, passowrd: req.body.password },
  });
};
