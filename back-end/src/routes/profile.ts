import express from "express";
const profileController = require("../controllers/profile");

const router = express.Router();

router.get("/feed/:profileName", profileController.getProfile);

export default router;
