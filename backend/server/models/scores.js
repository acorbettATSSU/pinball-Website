const mongoose = require("mongoose");

//user schema/model
const newScoreSchema = new mongoose.Schema(
  {
    machine: {
      type: String,
      required: true,
      label: "machine",
    },
    score: {
      type: Number,
      required: true,
      label: "score",
    },
    name: {
      required: true,
      type: String,
      label: "name",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "scores" }
);

module.exports = mongoose.model('scores', newScoreSchema)