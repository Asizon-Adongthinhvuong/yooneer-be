const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Các route cho Category
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory); // Có thể thêm middleware bảo vệ nếu cần
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
