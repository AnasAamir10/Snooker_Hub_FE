const Tournament = require("../models/Tournament");
const path = require("path");

// Create tournament
exports.createTournament = async (req, res) => {
  try {
    const tournamentData = { ...req.body };
    
    // Handle file upload
    if (req.file) {
      tournamentData.image = req.file.filename;
      tournamentData.imageUrl = `/uploads/${req.file.filename}`;
    }
    
    // Map frontend fields to backend model
    if (tournamentData.name) {
      tournamentData.title = tournamentData.name;
      delete tournamentData.name;
    }
    if (tournamentData.fee) {
      tournamentData.entryFee = tournamentData.fee;
      delete tournamentData.fee;
    }
    
    const tournament = await Tournament.create(tournamentData);
    res.status(201).json({
      success: true,
      message: "Tournament created successfully",
      tournament
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all tournaments
exports.getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().sort({ date: 1 });
    res.json({
      success: true,
      count: tournaments.length,
      tournaments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single tournament
exports.getTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.json({
      success: true,
      tournament
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update tournament
exports.updateTournament = async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Handle file upload
    if (req.file) {
      updateData.image = req.file.filename;
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }
    
    // Map frontend fields to backend model
    if (updateData.name) {
      updateData.title = updateData.name;
      delete updateData.name;
    }
    if (updateData.fee) {
      updateData.entryFee = updateData.fee;
      delete updateData.fee;
    }
    
    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.json({
      success: true,
      message: "Tournament updated successfully",
      tournament
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete tournament
exports.deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }
    res.json({
      success: true,
      message: "Tournament deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};