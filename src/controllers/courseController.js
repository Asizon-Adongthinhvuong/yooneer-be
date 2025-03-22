const mongoose = require("mongoose");
const Course = require("../models/Course");
const User = require("../models/userModel");

// Lấy danh sách khóa học
const getCourses = async (_req, res) => {
  try {
    const courses = await Course.find().populate("category instructor");
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Lấy chi tiết khóa học
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("category instructor");
    if (!course) {
      return res.status(404).json({ message: "Khóa học không tồn tại" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Tạo khóa học
const createCourse = async (req, res) => {
  try {
    const { title, description, price, image, category, instructor } = req.body;

    if (!title || !description || !price || !category || !instructor) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    const priceNumber = Number(price);
    if (isNaN(priceNumber)) {
      return res.status(400).json({ message: "Giá phải là số!" });
    }

    const instructorExists = await User.findById(instructor);
    if (!instructorExists) {
      return res.status(400).json({ message: "Giảng viên không hợp lệ!" });
    }

    const newCourse = new Course({
      title,
      description,
      price: priceNumber,
      image: image || null,
      category,
      instructor,
    });

    await newCourse.save();
    res.status(201).json({ message: "Khóa học đã được thêm thành công!", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Cập nhật khóa học
const updateCourse = async (req, res) => {
  try {
    const { title, description, price, image, category, instructor } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Khóa học không tồn tại" });
    }

    if (title) course.title = title;
    if (description) course.description = description;
    if (price) {
      const priceNumber = Number(price);
      if (isNaN(priceNumber)) {
        return res.status(400).json({ message: "Giá phải là số!" });
      }
      course.price = priceNumber;
    }
    if (category) course.category = category;
    if (instructor) {
      const instructorExists = await User.findOne({ _id: new mongoose.Types.ObjectId(instructor) });
      if (!instructorExists) {
        return res.status(400).json({ message: "Giảng viên không hợp lệ!" });
      }
      course.instructor = instructor;
    }
    if (image) course.image = image;

    await course.save();
    res.json({ message: "Cập nhật khóa học thành công!", course });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Xóa khóa học
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Khóa học không tồn tại" });
    }

    await course.deleteOne();
    res.json({ message: "Xóa khóa học thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

module.exports = { getCourses, getCourseById, createCourse, updateCourse, deleteCourse };
