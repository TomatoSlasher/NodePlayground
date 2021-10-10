import express from "express";
import feed from "./routes/tweet";
import mongoose, { CallbackWithoutResult } from "mongoose";
import path from "path";
import multer from "multer";
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

mongoose
  .connect(
    "mongodb+srv://tomato:ms4680SXk0j12JG6@cluster0.z1y59.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((res) => app.listen(8080))

  .catch((err) => console.log(err));
