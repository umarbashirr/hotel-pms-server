import { Router } from "express";

import { verifyAccessToken } from "../middlewares/verify-access-token";
import { getHotelOccupancy } from "../controllers/occupancy.controller";

const router = Router();

router.route("/").get(verifyAccessToken, getHotelOccupancy);

export default router;
