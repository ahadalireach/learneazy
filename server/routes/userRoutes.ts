import express from "express";
const router = express.Router();
import {
  registerNewUser,
  activateUserAccount,
  authenticateUser,
  logoutCurrentUser,
  refreshUserAccessToken,
  authenticateWithSocialMedia,
  getCurrentUserProfile,
  updateUserProfile,
  changeUserPassword,
  updateUserProfilePicture,
  getAllUsersByAdmin,
  changeUserRoleByAdmin,
  deleteUserByAdmin,
} from "../controllers/userController";
import { authorizeRoles, isAuthenticated } from "./../middleware/auth";

router.post("/auth/register", registerNewUser);
router.post("/auth/activate", activateUserAccount);
router.post("/auth/login", authenticateUser);
router.get("/auth/logout", isAuthenticated, logoutCurrentUser);
router.get("/auth/refresh-token", refreshUserAccessToken);
router.post("/auth/social-login", authenticateWithSocialMedia);

router.get("/profile/me", isAuthenticated, getCurrentUserProfile);
router.put("/profile/update-info", isAuthenticated, updateUserProfile);
router.put("/profile/change-password", isAuthenticated, changeUserPassword);
router.put("/profile/update-avatar", isAuthenticated, updateUserProfilePicture);

router.get(
  "/admin/users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsersByAdmin
);
router.put(
  "/admin/change-user-role",
  isAuthenticated,
  authorizeRoles("admin"),
  changeUserRoleByAdmin
);
router.delete(
  "/admin/delete/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUserByAdmin
);

export default router;
