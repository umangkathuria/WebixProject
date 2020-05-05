

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

                            // Update the List
                            let oldData = $$('roles_list').find((obj)=>{
                                return obj.role.toLowerCase().length != -1;
                            });
                            let roleExists = false;
                            for (let index = 0; index < oldData.length; index++) {
                               if(oldData[index].role == role){
                                   roleExists = true;
                                   break;
                               }
                            }
                            if(!roleExists){
                            // Call to Backend for adding data to user. 
                            addRole(role);
                            // Update UI
                            $$('roles_list').add({ role }, 0);
                            }else{
                                webix.message("Role is already added.")
                                this.getParentView().getParentView().hide();
                            }
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
                        rules:{
                            role:webix.rules.isNotEmpty
                        },
                        template: `<div class = "text", style = "float:left;">#role#</div>`,
                        // data: getRoles(),
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
            { view: 'button', value: 'Update', id: "btnRoleUpdate" },
            { view: 'button', value: 'Remove', id: "btnRoleRemove" }
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
                view: "select", id: "roleDD", name: "roleDD", label: "Role", value: "role",
                options: ["Create a new role"],

            },
            {
                view: 'button', value: 'Submit', css: "webix-primary",
                click: function () {
                    // Fetch the data from inputs
                    let input = {};
                    input.name = $$("name").getValue();
                    input.email = $$("email").getValue();
                    input.role = $$("roleDD").getValue("role");
                    if (input.role === "Create a new role") {
                        webix.message("Required role is not availble. <br>Please add a role and then add user here.");
                        showRoleView();
                    }
                    else if ($$("roleDD")) {

                        // Call to Backend for adding data to user. 
                        addUser(input);
                        // Update the List
                        addDataToList(input)
                    } else {


                    }

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


