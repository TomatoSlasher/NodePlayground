import express from "express";
// import feedController from "../controllers/feed";
import { body } from "express-validator/check";
const feedController = require("../controllers/feed");
const imageController = require("../controllers/imageUpload");

const router = express.Router();
router.get("/feed", feedController.getFeed);
router.post("/image", imageController.createImage);
router.post(
  "/todo",
  [body("content").trim().isLength({ min: 5 })],
  feedController.createToDo
);

export default router;
