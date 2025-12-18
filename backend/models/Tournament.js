const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Tournament title is required"],
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  date: {
    type: String,
    required: [true, "Tournament date is required"]
  },
  time: {
    type: String,
    default: "18:00"
  },
  entryFee: {
    type: Number,
    default: 0,
    min: 0
  },
  maxPlayers: {
    type: Number,
    required: [true, "Maximum players is required"],
    min: 2
  },
  currentPlayers: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    default: "upcoming"
  },
  image: {
    type: String,
    default: ""
  },
  imageUrl: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Tournament", TournamentSchema);