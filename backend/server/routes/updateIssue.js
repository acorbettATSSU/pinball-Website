const express = require("express");
const router = express.Router();

const scoreModel = require('../models/issues')

// Add a route to update an issue by ID
router.put('/updateIssue/:id', async (req, res) => {
    const issueId = req.params.id;
    const { machine, issue, name, status } = req.body;

    try {
        // Find the issue by its ID
        const existingIssue = await scoreModel.findById(issueId);

        if (!existingIssue) {
            return res.status(404).send({ message: "Issue not found" });
        }

        // Update the issue properties
        existingIssue.machine = machine;
        existingIssue.issue = issue;
        existingIssue.name = name;
        existingIssue.status = status;

        // Save the updated issue
        const updatedIssue = await existingIssue.save();
        res.send(updatedIssue);
    } catch (error) {
        res.status(400).send({ message: "Error trying to update the issue" });
    }
});

module.exports = router;
