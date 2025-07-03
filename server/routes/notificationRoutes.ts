import express from "express";
const router = express.Router();
import {
  getAllNotificationsByAdmin,
  markNotificationAsRead,
} from "../controllers/notificationController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

router.get(
  "/admin/all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllNotificationsByAdmin
);
router.put(
  "/admin/mark-read/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  markNotificationAsRead
);

export default router;
