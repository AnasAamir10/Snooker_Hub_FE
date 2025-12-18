const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"]
  },
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: [true, "Tournament ID is required"]
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "cancelled"],
    default: "pending"
  }
});

// Prevent duplicate registrations
RegistrationSchema.index({ user: 1, tournament: 1 }, { unique: true });

module.exports = mongoose.model("Registration", RegistrationSchema);