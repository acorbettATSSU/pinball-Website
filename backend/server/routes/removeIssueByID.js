const express = require("express");
const router = express.Router();
const issueModel = require('../models/issues')

router.put("/removeIssue", async (req, res) => { 
    try{
        const response = await issueModel.deleteOne({issueID: req.body.id})
        res.status(200).json(response)
        console.log("issue deleted")
      }catch{
        res.status(400).send({message: "issue does not exist"})
      }
    });
    

  
module.exports = router;