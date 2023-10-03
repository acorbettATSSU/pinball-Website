const express = require("express");
const router = express.Router();

const scoreModel = require('../models/scores')

router.post('/addScore', async (req, res) => {
    
    const { machine, score, name } = req.body

    //creates a new user
    const createScore = new scoreModel({
        machine: machine,
        score : score,
        name: name,
    });

   
    try {
        const saveScore = await createScore.save();
        res.send(saveScore);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new score" });
    }

})

module.exports = router;