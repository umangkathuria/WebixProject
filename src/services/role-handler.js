/**
 * Imports
 */
const fs = require('fs');
const utils = require('../utils/utils')
const fileName = './data/roles.json';

/**
 * This method fetched the data for all roles. 
 * 
 * @param {Object} request contains the request object
 * @param {Object} response Contains the response object
 */
function getAllRoles(request, response) {
    console.log("Request received at getRoles");
    let rawdata = fs.readFileSync(fileName);
    let existingRoles = JSON.parse(rawdata);
    console.log("Sending Existing Roles | ", existingRoles)
    response.send(existingRoles)
}

/**
 * Use this method to handle all add role requests. 
 * 
 * @param {Object} request contains the request object
 * @param {Object} response Contains the response object
 */
function addRole(request, response) {
    
    // extracting body parameter
    let role = request.body.body;

    // Reading current data
    let rawdata = fs.readFileSync(fileName);
    let existingRoles = JSON.parse(rawdata);
    console.log("Request to add role | ", role);

    if (existingRoles.length == 0) {
        existingRoles.push({ role: role });
    } else {
        for (let index = 0; index < existingRoles.length; index++) {
            const oldRole = existingRoles[index];
            if (role != oldRole.role) {
                existingRoles.push({ role: role });
            }

        }
    }
    try {
        if (utils.writeToFile(fileName, existingRoles)) {
            response.send({
                status: 200,
                message: "Role added."
            })
        } else {
            response.send({
                status: 501,
                message: "Role couldn't be saved. Try again later."
            })
        }
    } catch (err) {
        console.log("Error while saving role- ", err);
    }


}


/**
 * This method handles all the requests for updating an existing role. 
 * 
 * @param {Object} request contains the request object
 * @param {Object} response Contains the response object
 */
function updateRole(request, response) {

    let updateOpts = JSON.parse(request.query.updateOpts);
    let rawdata = fs.readFileSync(fileName);
    let existingRoles = JSON.parse(rawdata);
    console.log("Request to add role | ", updateOpts);

    if (existingRoles.length == 0) {
        existingRoles.push({ role: updateOpts.newVal });
    } else {
        for (let index = 0; index < existingRoles.length; index++) {
            const oldRole = existingRoles[index];
            if (updateOpts.oldVal == oldRole.role) {
                existingRoles[index] = { role: updateOpts.newVal }
            }

        }
    }
    try {
        if (utils.writeToFile(fileName, existingRoles)) {
            console.log("Data Updated.")
            response.send({
                status: 200,
                message: "Role added."
            })
        } else {
            console.log("error")
            response.send({
                status: 501,
                message: "Role couldn't be saved. Try again later."
            })
        }
    } catch (err) {
        console.log("Error while saving role- ", err);
    }


}

/**
 * This method handles all the requests for deleting an existing role. 
 * 
 * @param {Object} request contains the request object
 * @param {Object} response Contains the response object
 */
function deleteRole(request, response) {
    console.log("Delete Role Request received.");
    let role = JSON.parse(request.query.role);
    console.log("Deleting Role.. ", role);

    let rawdata = fs.readFileSync(fileName);
    let existingRoles = JSON.parse(rawdata);

    let updatedRoles = [];
    existingRoles.forEach(element => {
        if (element.role != role) {
            updatedRoles.push(element);
        }
    });
    if (utils.writeToFile(fileName, updatedRoles)) {
        response.send({
            status: 200,
            message: "Role deleted."
        })
    } else {
        response.send({
            status: 501,
            message: "Role couldn't be updated. Try again later."
        })
    }
}


/*
* Exporting all handlers for role
*/
module.exports.getAllRoles = getAllRoles;
module.exports.deleteRole = deleteRole;
module.exports.addRole = addRole;
module.exports.updateRole = updateRole;


