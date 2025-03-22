const express = require("express");
const { protect, isMentor } = require("../middleware/authMiddleware");
const { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require("../controllers/courseController");

const router = express.Router();

router.get('/', getCourses);
router.get("/:id", getCourseById);
router.post("/", protect, isMentor, createCourse);
router.put("/:id", protect, isMentor, updateCourse);
router.delete("/:id", protect, isMentor, deleteCourse);

module.exports = router;
