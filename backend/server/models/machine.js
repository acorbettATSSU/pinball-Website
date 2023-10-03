const mongoose = require("mongoose");

//user schema/model
const newMachineSchema = new mongoose.Schema(
  {
    machine: {
      type: String,
      required: true,
      label: "machine",
    },

    maker: {
      required: true,
      type: String,
      label: "maker",
    },
    year: {
        type: Number,
        required: true,
        label: "year",
      },

  },
  { collection: "machine" }
);

module.exports = mongoose.model('machine', newMachineSchema)