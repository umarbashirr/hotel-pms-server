import { Router } from "express";
import { verifyAccessToken } from "../middlewares/verify-access-token";
import { getAllCurrentBookedGuests } from "../controllers/guest.controller";

const guestsRouter = Router();

guestsRouter.use(verifyAccessToken);

guestsRouter.route("/").get(getAllCurrentBookedGuests);

export default guestsRouter;
