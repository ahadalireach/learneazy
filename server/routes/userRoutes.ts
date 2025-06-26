import express from "express";
const router = express.Router();
import {
  registerUser,
  activateUser,
  loginUser,
  logoutUser,
} from "../controllers/userController";
import { isAuthenticated } from "./../middleware/auth";

router.post("/register", registerUser);
router.post("/activate", activateUser);
router.post("/login", loginUser);
router.get("/me", isAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
router.get("/logout", isAuthenticated, logoutUser);

export default router;
