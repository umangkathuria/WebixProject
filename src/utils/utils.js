const fs = require('fs');
/**
 * Performs a write operation to file in sync way. 
 * 
 * @param {String} fileName Name of the filename in which data is to be written
 * @param {JSON} data JSON Object containg the data to be writtne to file
 * @returns {Boolean} Returns a boolean, true for succss, and false for failure. 
 */
function writeToFile(fileName, data) {
    if(fileName !== null && fileName !== undefined && fileName !== ''){
        try {
            fs.writeFileSync(fileName, JSON.stringify(data), 'utf8');
            return true;
        } catch (error) {
            console.log("Error writing to file-", error)
            return false;
        }
    }else{
        return false;
    }
}


/**
 * Helper function to remove a specific value from an Array.
 * 
 * @param {Array} arr Array containing data
 * @param {Object} value A value/object that is to be removed from the array.
 */
function removeItem(arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}

module.exports.removeItem = removeItem;
module.exports.writeToFile = writeToFile;
