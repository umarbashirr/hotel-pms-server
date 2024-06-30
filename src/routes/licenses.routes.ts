import { Router } from "express";
import { getLicenses } from "../controllers/licenses.controller";

const licensesRouter = Router();

licensesRouter.route("/").get(getLicenses);

export default licensesRouter;
