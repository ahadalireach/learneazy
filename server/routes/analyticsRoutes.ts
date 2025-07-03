import express from "express";
const router = express.Router();
import {
  getUserAnalyticsByAdmin,
  getOrderAnalyticsByAdmin,
  getCourseAnalyticsByAdmin,
} from "../controllers/analyticsController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

router.get(
  "/admin/users",
  isAuthenticated,
  authorizeRoles("admin"),
  getUserAnalyticsByAdmin
);
router.get(
  "/admin/orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getOrderAnalyticsByAdmin
);
router.get(
  "/admin/courses",
  isAuthenticated,
  authorizeRoles("admin"),
  getCourseAnalyticsByAdmin
);

export default router;
