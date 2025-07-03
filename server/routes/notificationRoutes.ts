import express from "express";
const router = express.Router();
import {
  getAllNotificationsForAdmin,
  markNotificationAsRead,
} from "../controllers/notificationController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

router.get(
  "/admin/all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllNotificationsForAdmin
);
router.put(
  "/admin/mark-read/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  markNotificationAsRead
);

export default router;
