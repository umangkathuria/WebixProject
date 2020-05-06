/**
 * Imports
 */
const fs = require('fs');
const utils = require('../utils/utils')
const fileName = './data/users.json';


/**
 * Use this handler function to handle all requests at /getUser endpoint. 
 * 
 * @param {Object} request Request Object
 * @param {Object} response Response object
 */
function getAllUsers(request, response) {
    console.log("request received- getUsers");
    let existingUser = JSON.parse(fs.readFileSync(fileName));
    console.log("Sending Existing Users | ", existingUser)
    response.json(existingUser);
}

/**
 * Use this handler function to handle all requests at /deleteUser endpoint. 
 * 
 * @param {Object} request Request Object
 * @param {Object} response Response object
 */
function deleteUser(request, response) {
    let user = JSON.parse(request.query.user);
    let existingUsers = JSON.parse(fs.readFileSync(fileName));
    let updatedUsers = [];
    existingUsers.forEach(element => {
        if (element.email != user.email) {
            updatedUsers.push(element);
        }
    });
    if(utils.writeToFile(fileName, updatedUsers)){
        response.send({
            status: 'Operation Success',
            message: "User details deleted."
        })
    } else{
        response.send({
            status: 'Operation Failed',
            message: "Failed to delete user details."
        })
    }
}

/**
 * Use this handler function to handle all requests at /addUser endpoint. 
 * 
 * @param {Object} request Request Object
 * @param {Object} response Response object
 */
function addUser(request, response) {
    let isUpdate = false;
    let user = JSON.parse(request.body.body);
    let existingUser = JSON.parse(fs.readFileSync(fileName));
    if(existingUser.length > 0){
        existingUser.forEach((oldUser)=>{
            if(oldUser.email == user.email){
                isUpdate = true;
                oldUser.name = user.name;
                oldUser.role = user.role;
            }
        })
        if(!isUpdate){
            existingUser.push(user);
        }
    }else{
        existingUser.push(user);
    }
   
    if( utils.writeToFile(fileName, existingUser)) {
        response.send({
            status: 'Operation Success',
            message: "User details saved."
        })
    } else{
        response.send({
            status: 'Operation Failed',
            message: "Failed to save user details."
        })
    }
}



module.exports.getAllUsers = getAllUsers;
module.exports.addUser = addUser;
module.exports.deleteUser = deleteUser;


