import { Router } from "express";

import { verifyAccessToken } from "../middlewares/verify-access-token";
import { createIndividualProfile } from "../controllers/profiles.controller";

const router = Router();

router.route("/").post(verifyAccessToken, createIndividualProfile);

export default router;
