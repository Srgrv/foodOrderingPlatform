import express from "express";

//controllers
import MyUserController from "../controllers/MyUserController";

const router = express.Router();

// /api/my/user
router.post("/", MyUserController.createCurrentUser);

export default router;
