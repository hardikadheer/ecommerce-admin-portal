const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  stock: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});




const Product = mongoose.model("Product", productSchema);

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "customer"], default: "customer" },
});

const User = mongoose.model("User", userSchema);


// Routes
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().select("-_id"); // exclude _id
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Add product
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
app.put("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product
app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dashboard stats
app.get("/api/admin/stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ status: "active", stock: { $gt: 0 } });
    const totalUsers = await User.countDocuments(); // now dynamic
    const pendingOrders = 10; // keep placeholder for now

    res.status(200).json({
      totalProducts,
      totalUsers,
      pendingOrders,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().select("name email role"); // only fetch needed fields
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
