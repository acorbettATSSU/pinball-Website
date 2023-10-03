const express = require("express");
const router = express.Router();
const newScoreModel = require('../models/issues')

router.get('/getAll', async (req, res) => {
    const user = await newScoreModel.find();
    return res.json(user)
  })

  module.exports = router;