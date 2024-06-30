import { Router } from "express";
import { createBooking } from "../controllers/booking.controller";
const bookingRouter = Router();

bookingRouter.route("/").post(createBooking);

export default bookingRouter;
