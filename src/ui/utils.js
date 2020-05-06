/**
 * This file contains all the utility functions for making changes to UI.
 * 
 */

/**
 * Use this method to render roles form on click. The data is fetched from backend. 
 * 
 * @param {string} id Contains the ID of the element
 */
function showRoleView(id) {
    webix.ui(roles_form).show()
    getRoles()
        .then((roles) => {
            $$('roles_list').parse(roles, "json");
        })
        .catch((err)=>{
            webix.message("Could not load data from backend.");
        })

}

/**
 * Use this method to load Edit Screen for role.
 * 
 * @param {Object} user Contains the role for the user. 
 */
function showRoleEditView(user) {
    roles_edit.body.elements[0].value = user.role;
    webix.ui(roles_edit).show()

    $$('btnRoleRemove').attachEvent('onItemClick', function () {
        // Fetch the data from inputs

        let role = $$("roleEdit").getValue();

        // Call to Backend for adding data to user. 
        deleteRole(role)
            .then((_) => {
                // Reomve from list
                $$('roles_list').remove(user.id);
                this.getParentView().getParentView().hide();
            })
            .catch((_) => {
                webix.message("Could not update data at this moment. Please try agian later.", "error");
                this.getParentView().getParentView().hide();
            })


        
    })

    $$('btnRoleUpdate').attachEvent('onItemClick', function () {

        // Fetch the data from inputs
        let role = $$("roleEdit").getValue();

        // Call to Backend for adding data to user. 
        updateRole(user.role, role)
            .then((_) => {
                // Update the List
                $$('roles_list').updateItem(user.id, { role: role });
                $$('roles_list').refresh();

                this.getParentView().getParentView().hide();
            })
            .catch((err) => {
                webix.message("Could not update data at this moment. Please try agian later.", "error");
                this.getParentView().getParentView().hide();
            })


    })
}

/**
 * Use this method to load Edit User Screen.
 * 
 * @param {object} element Contains the ID of the element or the row on which 
 * edit is to be performed.
 */
function editUser(element) {
    let options;
    options = {
        mode: "edit",
        input: {},
        id: element
    }
    var user = this.getItem(element);
    options.input = user;
    loadAddUserForm(options)
}

/**
 * This method simply takes an object of data and populates the list with apt values. 
 * 
 * @param {object} data Contains the data to be added to the list.
 */
function addDataToList(data) {
    $$("id_all_user_list").add({
        name: data.name,
        email: data.email,
        role: data.role
    }, 0);
}


/**
 * Use this method to load the form for Adding a user, Editing a user or to delete a user. 
 * 
 * @param {Object} options Takes the object for options- mode of operation, object and other data.
 */
function loadAddUserForm(options) {
    if (options.mode === "edit" && (options.mode != null || options != undefined)) {

        // Deining Save button
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
                addUser(input)
                    .then((_) => {
                        // Update the List
                        $$("id_all_user_list").updateItem(options.id, input);
                        $$("id_all_user_list").refresh();
                        this.getParentView().getParentView().hide();
                    })
                    .catch((err) => {
                        webix.message("User could not be added.");
                        console.log(err);
                        this.getParentView().getParentView().hide();
                    })
            }
        };

        // Defining delete button
        let deleteButton = {
            view: 'button', value: 'Remove', css: "webix_danger",
            click: function () {
                // Fetch the data from inputs
                let input = {};
                input.name = $$("name").getValue();
                input.email = $$("email").getValue();
                input.role = $$("roleDD").getValue("role");

                // Call to Backend for adding data to user. 
                deleteUser(input)
                    .then((_) => {
                        // Update the List
                        $$("id_all_user_list").remove(options.input.id);
                        this.getParentView().getParentView().hide();
                    }).catch((err) => {
                        webix.message("Could not update at this moment", "error");
                        this.getParentView().getParentView().hide();
                    })
            }

        };

        // Defining Cancel button
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

        getRoles()
            .then((roles) => {
                webix.ui(editUserView).show();
                $$('email').disable();
                let opt = [];
                roles.forEach(obj => {
                    opt.push(obj.role);
                });
                $$('roleDD').define({
                    options: opt,
                    value: "role"
                });
                $$('roleDD').refresh();
            })
            .catch((err) => {
                console.log(err);
            })

    }
    else {
        getRoles()
            .then((roles) => {
                webix.ui(addUserFormNew).show();
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
    }
}
