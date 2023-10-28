import express from "express";
import {
    authenticatedUser,
    registerUser
} from "../controllers";

const AuthRouter = express.Router();

AuthRouter.post("/register", registerUser);
AuthRouter.get("/authenticated", authenticatedUser);

export { AuthRouter };
