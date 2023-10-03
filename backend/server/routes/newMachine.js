const express = require("express");
const router = express.Router();

const scoreModel = require('../models/machine')

router.post('/addMachine', async (req, res) => {
    
    const { machine, maker, year } = req.body

    //creates a new user
    const createScore = new scoreModel({
        machine: machine,
        maker: maker,
        year: year,
    });

   
    try {
        const saveScore = await createScore.save();
        res.send(saveScore);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new score" });
    }

})

module.exports = router;