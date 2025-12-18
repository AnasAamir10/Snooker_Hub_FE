const Registration = require("../models/Registration");
const Tournament = require("../models/Tournament");

// Register for tournament
exports.registerForTournament = async (req, res) => {
  try {
    const tournamentId = req.body.tournament || req.body.tournamentId;
    const userId = req.user.id; // Get from authenticated user

    if (!tournamentId) {
      return res.status(400).json({ error: "Tournament ID is required" });
    }

    // Check tournament exists and has space
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    if (tournament.currentPlayers >= tournament.maxPlayers) {
      return res.status(400).json({ error: "Tournament is full" });
    }

    // Check if already registered
    const existingRegistration = await Registration.findOne({
      user: userId,
      tournament: tournamentId
    });
    if (existingRegistration) {
      return res.status(400).json({ error: "Already registered for this tournament" });
    }

    // Create registration
    const registration = await Registration.create({
      user: userId,
      tournament: tournamentId
    });

    // Update tournament player count
    await Tournament.findByIdAndUpdate(tournamentId, {
      $inc: { currentPlayers: 1 }
    });

    res.status(201).json({
      success: true,
      message: "Registered for tournament successfully",
      registration
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all registrations
exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("user", "name email")
      .populate("tournament", "title date");
    
    res.json({
      success: true,
      count: registrations.length,
      registrations
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single registration by ID
exports.getRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate("user", "name email")
      .populate("tournament", "title date");
    
    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }
    
    res.json({
      success: true,
      registration
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update registration
exports.updateRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("user", "name email")
     .populate("tournament", "title date");
    
    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }
    
    res.json({
      success: true,
      message: "Registration updated successfully",
      registration
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get registrations by tournament
exports.getTournamentRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ 
      tournament: req.params.tournamentId 
    }).populate("user", "name email");
    
    res.json({
      success: true,
      count: registrations.length,
      registrations
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel registration
exports.cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }

    // Update tournament player count
    await Tournament.findByIdAndUpdate(registration.tournament, {
      $inc: { currentPlayers: -1 }
    });

    await registration.deleteOne();

    res.json({
      success: true,
      message: "Registration cancelled successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};