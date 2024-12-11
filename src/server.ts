import express, { Express } from "express";
import cors from "cors";
import stationRoutes from "./routes/stationRoutes";
import userRoutes from "./routes/userRoutes";
import searchRoutes from "./routes/searchRoutes";
import bookingRoutes from "./routes/bookingRoutes";

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.use("/api", stationRoutes);
app.use("/api", userRoutes);
app.use("/api", searchRoutes);
app.use("/api", bookingRoutes);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
