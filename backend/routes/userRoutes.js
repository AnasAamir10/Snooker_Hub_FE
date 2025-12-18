const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/auth");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/", protect, admin, getAllUsers);
router.get("/:id", protect, getUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;