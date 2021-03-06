import express from "express";
import feed from "./routes/tweet";
import user from "./routes/user";
import profile from "./routes/profile";
import helmet from "helmet";

import mongoose, { CallbackWithoutResult } from "mongoose";
import path from "path";
import multer from "multer";
const compression = require("compression");

const { v4: uuidv4 } = require("uuid");

const bodyParser = require("body-parser");
const app = express();
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "dist/images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + file.originalname);
  },
});
const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/tweet", feed);
app.use("/user", user);
app.use("/profile", profile);

mongoose
  .connect(
    `mongodb+srv://tomato:${process.env.MONGO_PASSWORD}@cluster0.z1y59.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then((res) => app.listen(process.env.PORT || 8080))

  .catch((err) => console.log(err));
