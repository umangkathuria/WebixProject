
function showView(id) {
    webix.message("Click on button " + id);
    switch (id) {
        case "btn_roles":
            webix.ui(roles_form).show()
            $$('roles_list').attachEvent('onViewShow', function () {
                this.data = getRoles();
                // console.log(this.data);
                console.log(this);
            })
            break;

        default:
            break;
    }
}


function editUser(element) {
    let options;
    options = {
        mode: "edit",
        input: {}
    }
    var user = this.getItem(element);
    console.log("User- ", user);
    options.input = user;
    loadAddUserForm(options)
    console.log(element);
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
                input.role = $$("role").getValue();

                // Call to Backend for adding data to user. 
                addUser(input);
                // Update the List
                addDataToList(input)
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
                input.role = $$("role").getValue();

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
        webix.ui(editUserView).show();

    }
    else {
        getRoles()
            .then((roles) => {
                webix.ui(addUserFormNew).show();
                console.log( "ROLE DD--",$$('add-user-form').elements.roleDD);
                $$('add-user-form').elements.roleDD.options = roles;
                let r = getRoles();
                let rs = Promise.resolve(r)
                console.log("RS",rs);
            })
    }
}
