"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import feedController from "../controllers/feed";
const express_validator_1 = require("express-validator");
const feedController = require("../controllers/feed");
const router = express_1.default.Router();
router.get("/feed", feedController.getFeed);
router.post("/todo", [(0, express_validator_1.body)("content").trim().isLength({ min: 5 })], feedController.createToDo);
exports.default = router;
