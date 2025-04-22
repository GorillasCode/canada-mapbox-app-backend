import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import { authMiddleware } from "./middleware/authMiddleware";
import { errorMiddleware } from "./middleware/errorMiddleware";


const app = express();

dotenv.config();
app.use(express.json());

app.use(errorMiddleware);
app.use(authMiddleware);

app.use("/api", routes);

export default app;
