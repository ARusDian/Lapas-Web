import express from "express";
import {
	createRole,
	deleteRole,
	getRoleById,
	getRolebyIdwithUsers,
	getRoles,
	updateRole,
} from "../controllers";
import { verifyUser, adminOnly } from "../middleware";


const roleRouter = express.Router();

roleRouter.get("/", verifyUser, adminOnly, getRoles );
roleRouter.get("/:id", verifyUser, adminOnly, getRoleById);
roleRouter.get("/:id/users", verifyUser, adminOnly, getRolebyIdwithUsers);
roleRouter.post("/", verifyUser, adminOnly, createRole);
roleRouter.put("/:id", verifyUser, adminOnly, updateRole);
roleRouter.delete("/:id", verifyUser, adminOnly, deleteRole);

export { roleRouter };
