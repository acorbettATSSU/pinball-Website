const mongoose = require("mongoose");

//user schema/model
const newIssueSchema = new mongoose.Schema(
  {
    machine: {
      type: String,
      required: true,
      label: "machine",
    },
    issue: {
      type: String,
      required: true,
      label: "issue",
    },
    name: {
      required: true,
      type: String,
      label: "name",
    },
    status: {
      required: true,
      type: String,
      label: "status",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "issues" }
);

module.exports = mongoose.model('issues', newIssueSchema)