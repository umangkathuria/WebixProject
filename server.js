/**
 * Require
 */
const express = require('express');
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

// Route for /getAllApps
app.get("/getUsers", userHandler.getAllUsers);
app.get("/deleteUser", userHandler.deleteUser);
app.get("/addUser", userHandler.addUser);

app.get("/getRoles", roleHandler.getAllRoles);
app.get("/deleteRole", roleHandler.deleteRole);
app.get("/addRole", roleHandler.addRole);
app.get("/updateRole", roleHandler.updateRole);


// Route for /getAllApps






app.listen(8080, () => {
  console.log('Server intialised.');
});
