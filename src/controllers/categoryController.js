const Category = require("../models/Category");

// Lấy danh sách tất cả các category
const getCategories = async (_req, res) => {
  try {
    // Populate parent nếu cần (để xem thông tin category cha)
    const categories = await Category.find().populate("parent");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Lấy chi tiết 1 category theo ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("parent");
    if (!category) {
      return res.status(404).json({ message: "Category không tồn tại" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Tạo mới một category
const createCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Vui lòng nhập tên category!" });
    }

    const newCategory = new Category({
      name,
      parent: parent || null, // Nếu không có parent thì gán null
    });

    await newCategory.save();
    res.status(201).json({ message: "Category được tạo thành công!", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Cập nhật category
const updateCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category không tồn tại" });
    }
    if (name) category.name = name;
    if (typeof parent !== "undefined") category.parent = parent; // Có thể cập nhật thành null hoặc _id của category cha

    await category.save();
    res.json({ message: "Cập nhật thành công!", category });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Xóa category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category không tồn tại" });
    }
    await category.deleteOne();
    res.json({ message: "Xóa category thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
