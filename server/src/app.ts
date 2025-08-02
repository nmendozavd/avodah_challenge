import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import rootRoutes from "./routes/root.routes";
import resilientRoutes from "./routes/resilient.routes";
import metricRoutes from "./routes/metrics.routes";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/", rootRoutes);     
app.use("/", resilientRoutes);
app.use("/", metricRoutes);

export default app;
