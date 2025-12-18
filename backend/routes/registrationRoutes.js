const express = require("express");
const router = express.Router();
const {
  registerForTournament,
  getAllRegistrations,
  getRegistration,
  updateRegistration,
  getTournamentRegistrations,
  cancelRegistration
} = require("../controllers/registrationController");
const { protect, admin } = require("../middleware/auth");

// Registration routes
router.post("/", protect, registerForTournament);
router.get("/", protect, admin, getAllRegistrations);
router.get("/:id", protect, getRegistration);
router.put("/:id", protect, updateRegistration);
router.get("/tournament/:tournamentId", protect, getTournamentRegistrations);
router.delete("/:id", protect, cancelRegistration);

module.exports = router;