import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { authMiddleware } from "./middleware/authMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();
app.use(express.json());

app.use(errorMiddleware);
app.use(authMiddleware);

app.use("/api", routes);

export default app;
