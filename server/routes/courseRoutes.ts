import express from "express";
const router = express.Router();
import { isAuthenticated } from "./../middleware/auth";
import {
  createCourse,
  updateCourse,
  getCoursePreview,
  getAllCoursePreviews,
  getPurchasedCourseContent,
} from "../controllers/courseController";
import { authorizeRoles } from "../controllers/userController";

router.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  createCourse
);
router.put(
  "/update-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateCourse
);
router.get("/course-preview/:id", getCoursePreview);
router.get("/course-previews", getAllCoursePreviews);
router.get("/purchased-course/:id", isAuthenticated, getPurchasedCourseContent);

export default router;
