import { NextFunction, Response } from "express";
// const { validationResult } = require("express-validator/check");
import { validationResult } from "express-validator";

const User = require("../models/user");

exports.getProfile = async (req: any, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: any = new Error(
      "Validation failed, entered data is incorrect."
    );
    error.statusCode = 422;
    throw error;
  }
  const username = req.params.profileName;
  const userData = await User.findOne({ username: username });
  if (!userData) {
    return res.status(200).json({
      message: "user not found",
    });
  }
  res.status(200).json({
    message: `User ${userData.username}`,
  });
};
