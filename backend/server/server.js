const express = require("express");
const app = express();
const cors = require('cors')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')
const addScore = require('./routes/newScore')
const allScore = require('./routes/scoreGetAll')
const addIssue = require('./routes/newIssue')
const allIssue = require('./routes/getAllIssue')
const allMachine = require('./routes/getAllMachine')
const addMachine = require('./routes/newMachine')
const getMachineID = require('./routes/getMachineID')
const scoreByMacID = require('./routes/getScoreByMachine')
//const removeIssueID = require("./routes/issues/removeIssueByID")
const removeScoreID = require("./routes/removeScore")

require('dotenv').config();
const SERVER_PORT = 8081

dbConnection()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', editUser)
app.use('/user', deleteUser)
app.use('/score',addScore)
app.use("/score",allScore)
app.use("/issue",addIssue)
app.use("/issue",allIssue)
app.use("/machine",allMachine)
app.use("/machine",addMachine)
app.use("/machine", getMachineID)
app.use("/score",scoreByMacID)
app.use("/score",removeScoreID)
//app.use("/issue",removeIssueID )


app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
