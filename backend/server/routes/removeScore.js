const express = require("express");
const router = express.Router();
const newScoreModel = require('../models/scores');

router.delete("/removeScore/:scoreId", async (req, res) => {
  const { scoreId } = req.params;

  newScoreModel.findByIdAndRemove(scoreId)
    .then(score => {
      if (score) {
        res.status(200).json({ msg: 'Score entry deleted successfully' });
      } else {
        res.status(404).json({ error: 'No matching score found' });
      }
    })
    .catch(err => res.status(500).json({ error: 'Internal server error' }));
});

module.exports = router;
