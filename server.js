/**
 * Require
 */
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
const userHandler = require('./src/services/user-handler');
const roleHandler = require('./src/services/role-handler');



// Express initialisation
const app = express();

// Setting headers to ensure that CORS is validated.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

// Setting body parser to read data for post calls. 
app.use(bodyParser.urlencoded({ extended: false }))

// Routes for all users related operations
app.get("/getUsers", userHandler.getAllUsers);
app.get("/deleteUser", userHandler.deleteUser);
app.post("/addUser", userHandler.addUser);

// Routes for all role related operations
app.get("/getRoles", roleHandler.getAllRoles);
app.get("/deleteRole", roleHandler.deleteRole);
app.post("/addRole", roleHandler.addRole);
app.get("/updateRole", roleHandler.updateRole);

// Starting server
app.listen(process.env.PORT, () => {
  console.log(`Server intialised at localhost:${process.env.PORT}.`);
});
