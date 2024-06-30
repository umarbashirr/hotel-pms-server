import { Router } from "express";
import { verifyAccessToken } from "../middlewares/verify-access-token";
import {
  createHotel,
  getAllHotelsForAuthUser,
  getHotelDetails,
  getUsersListOfHotel,
  updateHotelDetails,
} from "../controllers/hotel.controller";
import verifyUserAdminRights from "../middlewares/verify-user-admin-rights";

const router = Router();

router.route("/create-new-instance").post(createHotel);
router.route("/").get(verifyAccessToken, getAllHotelsForAuthUser);
router.route("/users").get(verifyAccessToken, getUsersListOfHotel);
router.route("/hotel/:id").get(verifyAccessToken, getHotelDetails);
router
  .route("/hotel/:id")
  .put(verifyAccessToken, verifyUserAdminRights, updateHotelDetails);

export default router;
