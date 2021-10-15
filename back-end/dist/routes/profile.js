"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileController = require("../controllers/profile");
const isAuth = require("../middleware/isAuth");
const router = express_1.default.Router();
router.get("/view/:profileName", isAuth, profileController.getProfile);
router.post("/follow", isAuth, profileController.followProfile);
router.post("/unfollow", isAuth, profileController.unFollowProfile);
exports.default = router;
