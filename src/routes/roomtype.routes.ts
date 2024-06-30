import { Router } from "express";
import { verifyAccessToken } from "../middlewares/verify-access-token";
import {
  createRoomType,
  getRoomTypes,
  updateRoomType,
} from "../controllers/roomtype-controller";
import verifyUserAdminRights from "../middlewares/verify-user-admin-rights";

const router = Router();

router.use(verifyAccessToken);

router.route("/").get(getRoomTypes);

router.route("/").post(verifyUserAdminRights, createRoomType);

router.route("/:id").put(verifyUserAdminRights, updateRoomType);

export default router;
