
let globalRoleData;

// Roles form component
let roles_form = {
    view: 'window',
    id: "roles_form",
    head: 'Roles',
    close: true,
    modal: true,
    position: 'center',
    body: {
        rows: [
            {
                view: 'form',
                elements: [
                    { view: "text", id: "newRole", label: "Role", name: "role" },
                    {
                        view: 'button', value: 'Add Role',
                        click: function () {
                            // Fetch the data from inputs

                            let role = $$("newRole").getValue();

                            // Call to Backend for adding data to user. 
                            addRole(role);
                            // Update the List
                            $$('roles_list').add({ role }, 0);
                            this.getParentView().getParentView().hide();
                        }
                    }
                ]
            },
            {
                rows: [
                    {
                        view: "template", template: "All Available Roles", type: "header"
                    },
                    {
                        view: "list",
                        id: "roles_list",
                        head: "Available Roles",
                        template: `<div class = "text", style = "float:left;">#role#</div>`,
                        data: getRoles(),
                        autoheight: true,
                        type: {
                            height: 50,
                        },
                        click: function (element) {
                            var role = this.getItem(element);
                            showRoleEditView(role);
                        },
                        on: {
                            onViewShow: function () {
                                this.data = getRoles();
                            }
                        }
                    }]
            }]

    },
    on: {
        onHide: function () {
            this.destructor();
        },
        onVisible: function () {
            getRoles();
        }
    },
    move: true
}

function showRoleEditView(user) {
    console.log(user);
    roles_edit.body.elements[0].value = user.role;
    webix.ui(roles_edit).show()
}
let roles_edit = {
    view: 'window',
    head: 'Roles',
    close: true,
    modal: true,
    position: 'center',
    body: {
        view: 'form',
        elements: [
            { view: "text", id: "roleEdit", label: "Role", name: "role" },
            {
                view: 'button', value: 'Update',
                click: function () {

                    // Fetch the data from inputs
                    let role = $$("roleEdit").getValue();

                    // Call to Backend for adding data to user. 
                    addRole(role);
                    // Update the List
                    $$('roles_list').updateItem(role, "New Role");
                    $$('roles_list').add({ role }, 0);
                    this.getParentView().getParentView().hide();
                }
            },
            {
                view: 'button', value: 'Remove',
                click: function () {
                    // Fetch the data from inputs

                    let role = $$("roleEdit").getValue();

                    // Call to Backend for adding data to user. 
                    deleteRole(role);

                    // Reomve from list
                    $$('roles_list').remove(role);
                    this.getParentView().getParentView().hide();
                }
            }
        ]
    },
    on: {
        onHide: function () {
            this.destructor();
        }
    },
    move: true
}

// Add User form component
var addUserFormNew = {
    view: 'window',
    id: "add-user-form-window",
    head: 'Add a new User',
    modal: true,
    position: 'center',
    body: {
            view: 'form',
            id: "add-user-form",
            elements: [
                
                { view: "text", id: "name", label: "Name", name: "name" },
                { view: "text", id: "email", label: "Email", name: "email" },
                {
                    view: "select", name: "roleDD", label: "Role", value: 1,
                    options: [], 
                    
                },
                {
                    view: 'button', value: 'Submit', css: "webix-primary",
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
                        this.getParentView().getParentView().hide();
                    }
                }
            ]
        },
    on: {
        onHide: function () {
            this.destructor();
        }
    },
    move: true,
    close: true,
}


