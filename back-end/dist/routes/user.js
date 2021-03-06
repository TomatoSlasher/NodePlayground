"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController = require("../controllers/user");
const router = express_1.default.Router();
router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
exports.default = router;
