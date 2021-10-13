import { NextFunction, Response } from "express";
// const { validationResult } = require("express-validator/check");
import { validationResult } from "express-validator";
const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.loginUser = async (req: any, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: any = new Error(
      "Validation failed, entered data is incorrect."
    );
    error.statusCode = 422;
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  const userEmail = await User.findOne({ email: email });
  const doMatch = userEmail
    ? await bcrypt.compare(password, userEmail.password)
    : null;
  if (!userEmail) {
    return res.status(200).json({
      message: "user doesn't exist",
    });
  }
  if (userEmail.email != email || !doMatch) {
    return res.status(200).json({
      message: "Invalid E-mail or Password",
    });
  }
  if (userEmail.email == email && doMatch) {
    return res.status(200).json({
      message: "Logged In",
    });
  }
};

exports.createUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error(
        "Validation failed, entered data is incorrect."
      );
      error.statusCode = 422;
      throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const encryptedPassowrd = await bcrypt.hash(password, 12);
    const userEmail = await User.findOne({ email: email });
    if (userEmail) {
      return res.status(200).json({
        message: "user already exists",
      });
    }
    const user = new User({
      email: email,
      password: encryptedPassowrd,
    });
    user
      .save()
      .then(() => {
        res.status(200).json({
          message: "user created",
          res: { email: req.body.email },
        });
      })
      .catch((err: any) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  } catch (error) {
    console.log(error);
  }
};
