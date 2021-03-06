
///////////// FUNCIÓN PARA IMPRIMIR LISTA

let selectId;

const getEmployeesHTML = () => {
    const table = document.querySelector("#employees-list");
    table.innerHTML = "";
    employees.map(employee => {
        let row = document.createElement("tr");
        let tdSelect = createSelectButton();
        tdSelect.id = employee.id;

        let cellName = document.createElement("td");
        cellName.innerHTML = employee.fullname;

        let cellMail = document.createElement("td");
        cellMail.innerHTML = employee.email;

        let cellAddress = document.createElement("td");
        cellAddress.innerHTML = employee.address;

        let cellPhone = document.createElement("td");
        cellPhone.innerHTML = employee.phone;

        let cellActions = document.createElement("td");

        let botonEdit = createEditButton(employee.id, employee.fullname, employee.email, employee.address, employee.phone);
        let botonDelete = createDeleteButton(employee.id);

        cellActions.appendChild(botonEdit);
        cellActions.appendChild(botonDelete);
        row.appendChild(tdSelect);
        row.appendChild(cellName);
        row.appendChild(cellMail);
        row.appendChild(cellAddress);
        row.appendChild(cellPhone);
        row.appendChild(cellActions);
        table.appendChild(row);

    })
};



///////////// FUNCIÓN QUE CREA EL CHECK DE CADA <TR>

const createSelectButton = () => {
    let cell = document.createElement("td");
    const select = document.createElement("label");
    select.classList.add("check");
    const icon1 = document.createElement("i");
    icon1.classList.add("material-icons");
    icon1.classList.add("unchecked");
    icon1.innerHTML = "check_box_outline_blank";
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.classList.add("checkbox");
    const icon2 = document.createElement("i");
    icon2.classList.add("material-icons");
    icon2.classList.add("checked");
    icon2.innerHTML = "check_box";
    select.appendChild(icon1);
    select.appendChild(input);
    select.appendChild(icon2);
    cell.appendChild(select);
    return cell;
}



///////////// FUNCIONES PARA EL BOTÓN DE EDITAR

const createEditButton = (idtoChange, name, mail, adress, phone) => {
    let button = document.createElement("button");
    button.classList.add("transparent-button");
    let iconEdit = document.createElement("i");
    iconEdit.setAttribute("title", "Edit");
    iconEdit.classList.add("material-icons", "yellow");
    iconEdit.innerHTML = "&#xE254";
    button.appendChild(iconEdit);

    button.addEventListener("click", () => {
        activateModal("#modal-edit");
        document.querySelector("#name-edit").value = name;
        document.querySelector("#email-edit").value = mail;
        document.querySelector("#Address-edit").value = adress;
        document.querySelector("#Phone-edit").value = phone;
        selectId = idtoChange;
    });
    return button;
}

const botonSave = document.querySelector("#edit-save-button");
const submitEditEmployee = document.querySelector('#edit-employee-form')
submitEditEmployee.addEventListener("submit", async (e) => {
    e.preventDefault();
    let fullname = document.querySelector("#name-edit").value;
    let email = document.querySelector("#email-edit").value;
    let address = document.querySelector("#Address-edit").value;
    let phone = document.querySelector("#Phone-edit").value;
    let modificar = await modifyEmployee(selectId, fullname, email, address, phone);
    if (modificar === true) {
        deactivateModal(botonSave);
    }
});

///////////// FUNCIONES PARA EL BOTÓN DE ELIMINAR

const createDeleteButton = idaelim => {
    let button = document.createElement("button");
    button.classList.add("transparent-button");
    let iconDelete = document.createElement("i");
    iconDelete.setAttribute("title", "Delete");
    iconDelete.classList.add("material-icons", "red");
    iconDelete.innerHTML = "&#xE872";
    button.appendChild(iconDelete);
    button.addEventListener("click", () => {
        activateModal("#modal-delete");
        selectId = idaelim;
    });
    return button;
}

const botonelim = document.querySelector("#delete-button");

botonelim.addEventListener("click", () => {
    deactivateModal(botonelim)
    deleteEmployee(selectId);
});



///////////// FUNCIONES PARA ACTIVAR Y DESACTIVAR MODAL

const activateModal = (idsectiontoChange) => {
    let sectiontoChange = document.querySelector(idsectiontoChange);
    sectiontoChange.classList.add("overlay");
}

const deactivateModal = (boton) => {
    boton.parentElement.parentElement.classList.add("slide-out-top");
    boton.parentElement.parentElement.parentElement.classList.add("fade-out");
    setTimeout(() => {
        boton.parentElement.parentElement.parentElement.classList.remove("overlay");
        boton.parentElement.parentElement.parentElement.classList.remove("fade-out");
        boton.parentElement.parentElement.classList.remove("slide-out-top")
    }, 500);
}



///////////// FUNCIONES DEL BOTON "AGREGAR EMPLEADO - PARA HACER QUE FUNCIONE EL MODAL"
const addButton = document.querySelector("#addEmployee");
addButton.addEventListener("click", () => {
    activateModal("#modal-add");
});



///////////// FUNCIONES DEL BOTON "GUARDAR EMPLEADO"
const create = document.querySelector("#create-employee");
const submitEmployee = document.querySelector("#new-employee");
submitEmployee.addEventListener("submit", async (e) => {
    e.preventDefault();
    await createEmployee();
    deactivateModal(create);
});

