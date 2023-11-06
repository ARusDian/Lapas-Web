import express from "express";
import {
    authenticatedUser,
    registerUser
} from "../controllers";
import { verifyUser } from "../middleware";
const AuthRouter = express.Router();

AuthRouter.post("/register", registerUser);
AuthRouter.get("/authenticated", verifyUser, authenticatedUser);

export { AuthRouter };
