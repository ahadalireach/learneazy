import express from "express";
const router = express.Router();
import {
  processOrder,
  getAllOrdersByAdmin,
  sendStripePublishableKey,
  createStripePaymentIntent,
} from "../controllers/orderController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

router.get(
  "/admin/all-orders",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrdersByAdmin
);
router.post("/process-order", isAuthenticated, processOrder);
router.get("/stripe-publishable-key", sendStripePublishableKey);
router.post("/create-payment-intent", createStripePaymentIntent);

export default router;
