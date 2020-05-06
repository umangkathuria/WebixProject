/**
 * This file contains the methods to make network calls.
 * Use the various method to perform network operations with backend to perform-
 * - Get Operations on all Users
 * - Get Operations on all Roles
 * - Post Operations on adding or updating a user
 * - Post Operations on adding a role
 * - Get Operation on deleting a User/Role
 */

// Defines the host address of server
const host = 'http://localhost:8080';

/**
 * Makes a call to backend to fetch the users
 */
async function getUsers() {
    let result = await webix.ajax(`${host}/getUsers`)
    return result.json()
}

/**
 * Makes a call to backend to fetch the roles
 */
function getRoles() {
    return new Promise((resolve, reject) => {
        webix.ajax().get(`${host}/getRoles`)
            .then((result) => {
                resolve(result.json())
            })
            .catch((err) => {
                webix.message(fetchErrMsg, "error")
                reject(err);
            })
    })
}
function consoleIt() {
    console.log("YAYA! list item clicked")

}

/**
 * Makes a call to backend to add a specific user.
 * 
 * @param {Object} input Contains the User object to be added.
 */
function addUser(input) {
    console.log("Sending request to add user - ", input);
    return new Promise((resolve, reject) => {
        webix.ajax().post(`${host}/addUser`, { body: input })
            .then((result) => {
                console.log("Data Fetched -", result);
                resolve();
            })
            .catch((err) => {
                reject(err);
            })
    })

}

/**
 * Makes a call to backend to add a new role.
 * 
 * @param {String} role Contains the role object to be added.
 */
function addRole(role) {
    console.log("Sending request to add role - ", role);
    return new Promise((resolve, reject) => {
        webix.ajax().post(`${host}/addRole`, { body: role })
            .then((_) => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            })
    })
}

/**
 * Makes a call to backend to update a specific role.
 * 
 * @param {String} oldRole Value of existing role to be updated
 * @param {String} newRole Updated value of role.
 */
function updateRole(oldRole, newRole) {
    console.log("Sending request to update role information.");
    let updateOpts = {
        oldVal: oldRole,
        newVal: newRole
    }
    return new Promise((resolve, reject) => {
        webix.ajax(`${host}/updateRole?updateOpts=${JSON.stringify(updateOpts)}`)
            .then((_) => {
                resolve();
            })
            .catch((err) => {
                webix.message(updateErrorMsg, "error");
                reject(err)
            })

    })
}

/**
 * Makes a call to backend to delete a user. 
 * 
 * @param {Object} user Contains the user object to be deleted from backend
 */
function deleteUser(user) {
    console.log("Sending request to remove user...", user);
    return new Promise((resolve, reject) => {
        webix.ajax(`${host}/deleteUser?user=${JSON.stringify(user)}`)
            .then((_) => {
                resolve();
            }).catch((err) => {
                webix.message(updateErrorMsg, "error");
                reject(err)
            })
    })
}

/**
 * Makes a call to backend to delete a role. 
 * 
 * @param {Object} role Contains the role object to be deleted from backend
 */
function deleteRole(role) {
    console.log("Sending request to remove role...", role);
    return new Promise((resolve, reject) => {
        webix.ajax(`${host}/deleteRole?role=${JSON.stringify(role)}`)
            .then((_) => {
                resolve();
            }).catch((err) => {
                webix.message(updateErrorMsg, "error");
                reject(err)
            })
    })
}
