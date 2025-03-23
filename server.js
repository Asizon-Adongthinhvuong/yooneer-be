
const cors = require('cors');
const express = require("express");
const connectDB = require("./src/config/db");
const authRoutes = require('./src/routes/authRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const path = require("path");
const courses = require("./src/routes/courseRoutes");
require("dotenv").config();
console.log("🔍 MONGODB_URL:", process.env.MONGODB_URL);
connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (_req, res) => {
  res.send("API đang chạy...");
});

app.use('/api/auth', authRoutes);
app.use("/api/courses", courses);
app.use("/api/categories", categoryRoutes);
// Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
