import express from "express";
// import feedController from "../controllers/feed";

const feedController = require("../controllers/feed");

const router = express.Router();
router.get("/feed", feedController.getFeed);

export default router;
