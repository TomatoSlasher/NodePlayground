import express from "express";
const profileController = require("../controllers/profile");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/view/:profileName", profileController.getProfile);
router.post("/follow", isAuth, profileController.followProfile);

export default router;
