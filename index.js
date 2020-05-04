

const host = 'http://localhost:8080';

async function getUsers() {
    let result = await webix.ajax(`${host}/getUsers`)
    return result.json()
}

function getRoles() {
    return new Promise((resolve, reject)=>{
        console.log("started getRoles")
        webix.ajax().get(`${host}/getRoles`)
        .then((result)=>{
            console.log(result.json())
            console.log(typeof(result.json()))
            resolve(result.json())
        })
        .catch((err)=> {
            reject(err);
        })

       
    })
   
    // if($$('roles_list').isVisible()){
      
    // }
}
function consoleIt() {
    console.log("YAYA! list item clicked")

}

function addUser(input) {
    console.log("Received input- ", input);
    // Create a request variable and assign a new XMLHttpRequest object to it.
    const request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', `${host}/addUser?user=${JSON.stringify(input)}`, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const data = JSON.parse(this.response);
            return data;
        }
    }
    request.send();
    // users.push({ "id": 1, "title": "The Shawshank Redemption", "year": "1994", "votes": "678,79", "rating": "9,2", "rank": "1", "role": "developer" });
}

function addRole(role) {
    console.log("Received role- ", role);
    webix.ajax(`${host}/addRole?role=${JSON.stringify(role)}`)
}


function deleteUser(user) {
    console.log("Remiving User... ", user);
    webix.ajax(`${host}/deleteUser?user=${JSON.stringify(user)}`)
}


function deleteRole(role) {
    console.log("Remiving User... ", role);
    webix.ajax(`${host}/deleteRole?role=${JSON.stringify(role)}`)
}
