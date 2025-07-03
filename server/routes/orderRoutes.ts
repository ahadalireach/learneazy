import express from "express";
const router = express.Router();
import {
  processOrder,
  getAllOrdersByAdmin,
} from "../controllers/orderController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

router.post("/process-order", isAuthenticated, processOrder);
router.get(
  "/admin/all-orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrdersByAdmin
);

export default router;
