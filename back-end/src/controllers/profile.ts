import { NextFunction, Response } from "express";
// const { validationResult } = require("express-validator/check");
import { validationResult } from "express-validator";

const User = require("../models/user");
exports.followProfile = async (req: any, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: any = new Error(
      "Validation failed, entered data is incorrect."
    );
    error.statusCode = 422;
    throw error;
  }
  console.log(req.body.profileId);
  const userDoc = await User.findById(req.userId);
  userDoc.following.push(req.body.profileId);
  await userDoc.save();

  const profileDoc = await User.findById(req.body.profileId);
  profileDoc.followers.push(req.userId);
  await profileDoc.save();

  res.status(200).json({
    message: `Profile Followed`,
  });
};

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
  const userData = await User.findOne(
    { username: username },
    { password: 0 }
  ).populate("tweets");
  if (!userData) {
    return res.status(200).json({
      message: "user not found",
    });
  }
  res.status(200).json({
    message: `User ${userData.username}`,
    data: userData,
  });
};
