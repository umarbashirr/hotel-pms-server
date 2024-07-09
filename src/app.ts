require("dotenv").config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN as string,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// Create logger for every request

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use(cors(corsOptions));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import healthCheckRoutes from "./routes/healthcheck.routes";
import authRoutes from "./routes/auth.routes";
import hotelRoutes from "./routes/hotel.routes";
import roomTypeRoutes from "./routes/roomtype.routes";
import roomRoutes from "./routes/room.routes";
import occupancyRoutes from "./routes/occupancy.routes";
import profileRoutes from "./routes/profile.routes";
import companyProfileRoutes from "./routes/company-profile.routes";
import bookingRoutes from "./routes/booking.routes";
import licenseRoutes from "./routes/licenses.routes";
import guestsRoutes from "./routes/guests.routes";

//routes declaration
app.use("/api/v1", healthCheckRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/hotels", hotelRoutes);
app.use("/api/v1/room-types", roomTypeRoutes);
app.use("/api/v1/rooms", roomRoutes);
app.use("/api/v1/occupancy", occupancyRoutes);
app.use("/api/v1/individual-profiles", profileRoutes);
app.use("/api/v1/company-profiles", companyProfileRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use("/api/v1/licenses", licenseRoutes);
app.use("/api/v1/guests", guestsRoutes);

// http://localhost:8000/api/v1/users/register

export { app };
