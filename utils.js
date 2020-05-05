
function showRoleView(id) {
    webix.ui(roles_form).show()
    getRoles()
    .then((roles) => {
        $$('roles_list').parse(roles, "json");
    })
    
}


function showRoleEditView(user) {
    roles_edit.body.elements[0].value = user.role;
    webix.ui(roles_edit).show()
    console.log(user);
    $$('btnRoleRemove').attachEvent('onItemClick', function () {
        // Fetch the data from inputs

        let role = $$("roleEdit").getValue();

        // Call to Backend for adding data to user. 
        deleteRole(role);

        // Reomve from list
        $$('roles_list').remove(user.id);
        this.getParentView().getParentView().hide();
    })

    $$('btnRoleUpdate').attachEvent('onItemClick', function () {

        // Fetch the data from inputs
        let role = $$("roleEdit").getValue();

        // Call to Backend for adding data to user. 
        updateRole(user.role, role);
        // Update the List
        $$('roles_list').updateItem(user.id, { role: role});
        console.log(user);
        $$('roles_list').refresh();
        // $$('roles_list').add({ role }, 0);
        this.getParentView().getParentView().hide();
    })
}

function editUser(element) {
    let options;
    options = {
        mode: "edit",
        input: {},
        id: element
    }
    var user = this.getItem(element);
    console.log("User- ", user);
    options.input = user;
    console.log("Element - ", element);
    loadAddUserForm(options)
}

function addDataToList(data) {
    $$("id_all_user_list").add({
        name: data.name,
        email: data.email,
        role: data.role
    }, 0);
}

function removeRole(element) {
    var role = this.getItem(element);

}

/**
 * Use this method to load the form for Adding a user, Editing a user or to delete a user. 
 * 
 * @param {Object} options Takes the object for options- mode of operation, object and other data.
 */
function loadAddUserForm(options) {
    console.log(options);
    if (options.mode === "edit" && (options.mode != null || options != undefined)) {
        // let editUserView = Object.assign({}, addUserFormNew, {})


        let saveButton = {
            view: 'button', value: 'Save', css: "webix_primary",
            click: function () {
                // Fetch the data from inputs
                let input = {};
                input.name = $$("name").getValue();
                input.email = $$("email").getValue();
                input.role = $$("roleDD").getValue("role");
                input.id = options.id;
                // Call to Backend for adding data to user. 
                addUser(input);
                // Update the List
                $$("id_all_user_list").updateItem(options.id, input);
                $$("id_all_user_list").refresh();
                this.getParentView().getParentView().hide();
            }
        };

        let deleteButton = {
            view: 'button', value: 'Remove', css: "webix_danger",
            click: function () {
                // Fetch the data from inputs
                let input = {};
                input.name = $$("name").getValue();
                input.email = $$("email").getValue();
                input.role = $$("roleDD").getValue("role");

                // Call to Backend for adding data to user. 
                deleteUser(input);
                // Update the List
                $$("id_all_user_list").remove(options.input.id);
                // $$("id_all_user_list").refresh();
                this.getParentView().getParentView().hide();
            }

        };

        let cancelButton = {
            view: 'button', value: 'Cancel', css: "webix_secondary",
            click: function () {
                this.getParentView().getParentView().hide();
            }

        };
        let editUserView = JSON.parse(JSON.stringify(addUserFormNew));
        editUserView.head = "Update user"
        editUserView.body.elements[3] = saveButton;
        // editUserView.body.elements.push(saveButton)
        editUserView.body.elements.push(deleteButton)
        editUserView.body.elements.push(cancelButton)
        editUserView.on = {
            onHide: function () {
                this.destructor();
            }
        }

        editUserView.body.elements[0].value = options.input.name;
        editUserView.body.elements[1].value = options.input.email;
        editUserView.body.elements[2].value = options.input.role;
        // editUserView.body.elements[1].readonly = true; 


        getRoles()
            .then((roles) => {
                webix.ui(editUserView).show();
                $$('email').disable();
                let opt = [];
                roles.forEach(obj => {
                    opt.push(obj.role);
                });
                opt.push("Create a new role");
                $$('roleDD').define({
                    options: opt,
                    value: "role"
                });
                $$('roleDD').refresh();
            })
            .catch((err) => {
                console.log(err);
                webix.message("Could not fetch updated roles.");
            })

    }
    else {
        getRoles()
            .then((roles) => {
                webix.ui(addUserFormNew).show();
                // console.log( "ROLE DD--",$$('add-user-form').elements.roleDD);
                console.log("Select List - ", $$('roleDD'));
                let opt = [];
                roles.forEach(obj => {
                    console.log("OBJ - ", obj);
                    opt.push(obj.role);
                });
                opt.push("Create a new role");
                $$('roleDD').define({
                    options: opt,
                    value: "role"
                });
                $$('roleDD').refresh();
            })
    }
}


function loadRoleEditView(seletedRole){

}