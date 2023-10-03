const express = require("express");
const router = express.Router();

const scoreModel = require('../models/issues')

router.post('/addIssue', async (req, res) => {
    
    const { machine, issue, name, status } = req.body

    //creates a new user
    const createIssue = new scoreModel({
        machine: machine,
        issue : issue,
        name: name,
        status: status,
    });

   
    try {
        const saveIssue = await createIssue.save();
        res.send(saveIssue);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new Issue" });
    }

})

module.exports = router;