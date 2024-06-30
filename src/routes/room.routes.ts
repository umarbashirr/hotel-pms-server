import { Router } from "express";
import { verifyAccessToken } from "../middlewares/verify-access-token";
import {
  createRoom,
  getRooms,
  updateRoom,
} from "../controllers/room.controller";
import verifyUserAdminRights from "../middlewares/verify-user-admin-rights";

const router = Router();

router.use(verifyAccessToken);

router.route("/").post(verifyUserAdminRights, createRoom);
router.route("/").get(getRooms);
router.route("/:id").put(verifyUserAdminRights, updateRoom);

export default router;
