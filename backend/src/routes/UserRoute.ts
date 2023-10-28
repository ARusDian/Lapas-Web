import express from "express";
import { approveUser, createUser, deleteApprovedUser, deleteUser, getUser, getUsers, setDisableUser, updateUser } from "../controllers";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
userRouter.post("/:id/approve", approveUser);
userRouter.put("/:id", updateUser);
userRouter.put("/:id/disable", setDisableUser);
userRouter.delete("/:id", deleteUser);
userRouter.delete("/:id/approve", deleteApprovedUser);


export { userRouter };
