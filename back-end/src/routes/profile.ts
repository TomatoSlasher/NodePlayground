import express from "express";
const profileController = require("../controllers/profile");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/view/:profileName", isAuth, profileController.getProfile);
router.post("/follow", isAuth, profileController.followProfile);
router.post("/unfollow", isAuth, profileController.unFollowProfile);

export default router;
