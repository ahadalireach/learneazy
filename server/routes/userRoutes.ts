import express from "express";
const router = express.Router();
import {
  registerUser,
  activateUser,
  loginUser,
  logoutUser,
  authorizeRoles,
  updateAccessToken,
  getUserInfo,
  socialAuth,
  updateUserInfo,
  updateUserPassword,
  updateUserAvatar,
} from "../controllers/userController";
import { isAuthenticated } from "./../middleware/auth";

router.post("/register", registerUser);
router.post("/activate", activateUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticated, logoutUser);
router.get("/refresh", updateAccessToken);
router.get("/me", isAuthenticated, getUserInfo);
router.post("/socialauth", socialAuth);
router.put("/update-user-info", isAuthenticated, updateUserInfo);
router.put("/update-user-password", isAuthenticated, updateUserPassword);
router.put("/update-user-avatar", isAuthenticated, updateUserAvatar);

export default router;
