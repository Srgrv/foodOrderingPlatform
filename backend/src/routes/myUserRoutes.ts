import express from "express";

//controllers
import MyUserController from "../controllers/MyUserController";

//middleware
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

// /api/my/user
router.post("/", jwtCheck, MyUserController.createCurrentUser);

export default router;
