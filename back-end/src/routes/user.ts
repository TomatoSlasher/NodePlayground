import express from "express";
const userController = require("../controllers/user");

const router = express.Router();

router.post("/signup", userController.createUser);

export default router;
