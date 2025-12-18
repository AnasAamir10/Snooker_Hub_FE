const express = require("express");
const router = express.Router();
const {
  createTournament,
  getAllTournaments,
  getTournament,
  updateTournament,
  deleteTournament
} = require("../controllers/tournamentController");
const { protect, admin } = require("../middleware/auth");
const upload = require("../middleware/upload");

// Public routes
router.get("/", getAllTournaments);
router.get("/:id", getTournament);

// Protected routes - Admin only
router.post("/", protect, admin, upload.single("image"), createTournament);
router.put("/:id", protect, admin, upload.single("image"), updateTournament);
router.delete("/:id", protect, admin, deleteTournament);

module.exports = router;