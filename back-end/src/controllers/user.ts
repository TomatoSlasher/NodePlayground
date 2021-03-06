import { NextFunction, Response } from "express";

import { validationResult } from "express-validator";

const jwt = require("jsonwebtoken");

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
    const token = jwt.sign(
      {
        email: userEmail.email,
        userId: userEmail._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      token: token,
      userId: userEmail._id.toString(),
      username: userEmail.username,
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
    const username = req.body.username.toLowerCase().replace(/ /g, "");
    const email = req.body.email;
    const password = req.body.password;
    const encryptedPassowrd = await bcrypt.hash(password, 12);
    const userEmail = await User.findOne({ email: email });
    const userUsername = await User.findOne({ username: username });

    if (userEmail) {
      return res.status(200).json({
        message: "user email already exists",
      });
    }
    if (userUsername) {
      return res.status(200).json({
        message: "username already exists",
      });
    }
    const user = new User({
      username: username,
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
