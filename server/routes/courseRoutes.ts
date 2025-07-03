import express from "express";
const router = express.Router();
import {
  createNewCourse,
  updateCourseDetails,
  getCoursePublicPreview,
  getAllPublicCoursePreviews,
  getEnrolledCourseContent,
  addCourseQuestion,
  addQuestionAnswer,
  addCourseReview,
  addReviewReply,
  getAllCoursesByAdmin,
  deleteCourseByAdmin,
} from "../controllers/courseController";
import { authorizeRoles, isAuthenticated } from "./../middleware/auth";

router.post(
  "/admin/create",
  isAuthenticated,
  authorizeRoles("admin"),
  createNewCourse
);
router.put(
  "/admin/update/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateCourseDetails
);
router.get(
  "/admin/all-courses",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCoursesByAdmin
);
router.delete(
  "/admin/delete/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCourseByAdmin
);

router.get("/public/preview/:id", getCoursePublicPreview);
router.get("/public/all-previews", getAllPublicCoursePreviews);

router.get("/enrolled/content/:id", isAuthenticated, getEnrolledCourseContent);
router.put("/enrolled/question", isAuthenticated, addCourseQuestion);
router.put("/enrolled/answer", isAuthenticated, addQuestionAnswer);
router.put("/enrolled/review", isAuthenticated, addCourseReview);
router.put(
  "/enrolled/review-reply",
  isAuthenticated,
  authorizeRoles("admin"),
  addReviewReply
);

export default router;
