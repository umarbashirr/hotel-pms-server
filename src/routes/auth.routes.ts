import { Router } from "express";
import { loginHandler, logoutHandler } from "../controllers/auth.controller";

const router = Router();

router.route("/login").post(loginHandler);
router.route("/logout").post(logoutHandler);

export default router;
