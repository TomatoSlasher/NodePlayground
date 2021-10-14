"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tweetController = require("../controllers/tweet");
const isAuth = require("../middleware/isAuth");
const router = express_1.default.Router();
router.post("/create", isAuth, tweetController.createTweet);
router.post("/delete", isAuth, tweetController.deleteTweet);
router.post("/edit", isAuth, tweetController.editTweet);
router.post("/img-preview", tweetController.previewTweetImage);
router.get("/all", isAuth, tweetController.getTweets);
// router.post(
//   "/todo",
//   [body("content").trim().isLength({ min: 5 })],
//   feedController.createToDo
// );
exports.default = router;
