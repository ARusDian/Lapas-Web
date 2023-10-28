import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { AuthRouter, roleRouter, userRouter } from "./routes";
import { requestLogger, unknownEndpoint, errorHandler, verifyUser, adminOnly } from "./middleware";
import initializationProviders from "./providers";

dotenv.config();

initializationProviders();

const app = express();

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.get("/api", async (req, res) => {
    res.send("Success connect with Server!");
});

app.get("/api", async (req, res) => {
    res.send("Success connect with Server!");
});

app.use("/api/auth", AuthRouter);

app.use(verifyUser);

app.use(adminOnly);
app.use("/api/users", userRouter);
app.use("/api/roles", roleRouter);

app.use(unknownEndpoint);

app.use(errorHandler);

export default app;
