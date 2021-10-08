"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import feedController from "../controllers/feed";
const { body } = require("express-validator/check");
const feedController = require("../controllers/feed");
const imageController = require("../controllers/imageUpload");
const router = express_1.default.Router();
router.get("/feed", feedController.getFeed);
router.post("/image", imageController.createImage);
router.get("/image", imageController.getImage);
router.post("/todo", [body("content").trim().isLength({ min: 5 })], feedController.createToDo);
exports.default = router;
