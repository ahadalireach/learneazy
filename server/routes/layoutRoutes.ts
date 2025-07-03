import express from "express";
const router = express.Router();
import {
  createWebsiteLayoutByAdmin,
  updateWebsiteLayoutByAdmin,
  getWebsiteLayoutByType,
} from "../controllers/layoutController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

router.post(
  "/admin/create-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  createWebsiteLayoutByAdmin
);

router.put(
  "/admin/update-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  updateWebsiteLayoutByAdmin
);

router.get("/public/layout/:type", getWebsiteLayoutByType);

export default router;
