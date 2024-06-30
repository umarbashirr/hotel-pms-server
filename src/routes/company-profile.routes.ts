import { Router } from "express";
import { verifyAccessToken } from "../middlewares/verify-access-token";
import { createCompanyProfile } from "../controllers/company-profile.controller";

const router = Router();

router.route("/").post(verifyAccessToken, createCompanyProfile);

export default router;
