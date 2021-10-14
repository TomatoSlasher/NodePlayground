import express from "express";
import { validationResult } from "express-validator";
const tweetController = require("../controllers/tweet");
const isAuth = require("../middleware/isAuth");
const router = express.Router();
router.post("/create", tweetController.createTweet);
router.post("/delete", tweetController.deleteTweet);
router.post("/edit", tweetController.editTweet);

router.post("/img-preview", tweetController.previewTweetImage);

router.get("/all", isAuth, tweetController.getTweets);

// router.post(
//   "/todo",
//   [body("content").trim().isLength({ min: 5 })],
//   feedController.createToDo
// );

export default router;
