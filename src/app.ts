import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import healthCheckRoutes from "./routes/healthcheck.routes";
import authRoutes from "./routes/auth.routes";

//routes declaration
app.use("/api/v1", healthCheckRoutes);
app.use("/api/v1/auth", authRoutes);

// http://localhost:8000/api/v1/users/register

export { app };
