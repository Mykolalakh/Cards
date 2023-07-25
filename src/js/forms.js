import { Modal } from "./Modal.js";
import { Input } from "./Modal.js";
import { Visit } from "./visit.js";
import { VisitCardiologist } from "./visit.js";
import { VisitDentist } from "./visit.js";
import { VisitTherapist } from "./visit.js";
import { Request } from "./Request.js";
import { Card } from "./Cards.js";

export class CreateVisit extends Modal {
  constructor(id, classes, text) {
    super(id, classes, text);
  }

  createForm = function () {
    const formData = {};
    const registrationForm = document.createElement("form");
    registrationForm.action = "";
    registrationForm.id = "registration-form";
    const headerText = document.createElement("h2");
    headerText.textContent = "Create a Visit";
    headerText.classList.add("headerText");
    const inputName = new Input(
      "text",
      "fullname",
      true,
      "visitCard",
      "visit-name",
      "Name and Surname",
      "ERROR"
    );
    const inputReason = new Input(
      "text",
      "Reason of visit",
      true,
      "visitReason",
      "visit-reason",
      "The reason of visit",
      "ERROR"
    );
    const inputDescription = new Input(
      "text",
      "Description of visit",
      true,
      "visitDescription",
      "visit-description",
      "The visit description",
      "ERROR"
    );

    const inputSubmit = new Input(
      "submit",
      "submitBtn",
      false,
      "submit-create-visit",
      "visit-submit-btn",
      "CreateVisit",
      "ERROR"
    );

    // Priority//
    const priorityWrapper = document.createElement("div");
    const selectPriority = document.createElement("select");
    selectPriority.name = "priority";
    selectPriority.id = "priority-select";
    selectPriority.innerHTML = `
  <option value="">--Please choose a priority--</option>
      <option value="normal">Normal</option>
      <option value="priority">Priority</option>
      <option value="urgent">Urgent</option>`;

    priorityWrapper.appendChild(selectPriority);

    //Doctor
    const doctorOption = document.createElement("div");
    const selectdoctor = document.createElement("select");
    selectdoctor.id = "doctor-select";
    selectdoctor.name = "doctor";

    selectdoctor.innerHTML = `
          <option value="">--Please choose a doctor--</option>
          <option value="cardiologist">Cardiologist</option>
          <option value="dentist">Dentist</option>
          <option value="therapist">Therapist</option>
      `;
    doctorOption.append(selectdoctor);
    //
    const cardiologistFields = new VisitCardiologist();
    const dentistFields = new VisitDentist();
    const therapistFields = new VisitTherapist();

    const onSelectDoctor = () => {
      const selectedDoctor = document.getElementById("doctor-select");
      const selectDoctorValue = selectedDoctor.value;
      // Найти все элементы с классами для полей и удалить их
      const fieldsToRemove = document.querySelectorAll(
        ".cardiologist-fields, .dentist-fields, .therapist-fields"
      );
      fieldsToRemove.forEach((field) => field.remove());

      if (selectDoctorValue === "cardiologist") {
        doctorOption.insertAdjacentElement(
          "afterend",
          cardiologistFields.render(),
          inputSubmit.el
        );
      } else if (selectDoctorValue === "dentist") {
        doctorOption.insertAdjacentElement(
          "afterend",
          dentistFields.render(),
          inputSubmit.el
        );
      } else if (selectDoctorValue === "therapist") {
        doctorOption.insertAdjacentElement(
          "afterend",
          therapistFields.render(),
          inputSubmit.el
        );
      }
    };

    registrationForm.addEventListener("input", (event) => {
      formData[event.target.name] = event.target.value;
    });

    selectdoctor.addEventListener("change", onSelectDoctor);

    const onSubmit = (event) => {
      event.preventDefault();
      const request = new Request("https://ajax.test-danit.com/api/v2/cards");

      request.postCard(formData).then((response) => {
        const card = new Card(response);
        card.createCard();
      });

      // один обьект
      const visitData = new Visit(formData);
      console.log(visitData);

      this.window.classList.remove("active");
      event.target.reset();
    };

    registrationForm.addEventListener("submit", onSubmit);

    registrationForm.append(
      headerText,
      inputName.render(),
      inputReason.render(),
      inputDescription.render(),
      priorityWrapper,
      doctorOption,
      inputSubmit.render()
    );

    return registrationForm;
  };
}

export class EditVisit extends Modal {
  constructor(id, classes, text) {
    super(id, classes, text);
  }
  editForm = function () {
    const editForm = document.createElement("form");
    editForm.action = "";
    editForm.id = "edit-form";

    const headerText = document.createElement("h2");
    headerText.textContent = "Edit a Visit";
    headerText.classList.add("headerText");

    const editName = new Input(
      "text",
      "fullname",
      true,
      "visitCard",
      "visit-name",
      "Name and Surname",
      "ERROR"
    );
    const editReason = new Input(
      "text",
      "Reason of visit",
      true,
      "visitReason",
      "visit-reason",
      "The reason of visit",
      "ERROR"
    );
    const editDescription = new Input(
      "text",
      "Description of visit",
      true,
      "visitDescription",
      "visit-description",
      "The visit description",
      "ERROR"
    );

    const editSubmit = new Input(
      "submit",
      "submitEditBtn",
      false,
      "submit-edit-visit",
      "visit-edit-btn",
      "EditVisit",
      "ERROR"
    );

    // Priority//
    const priorityWrapper = document.createElement("div");
    const selectPriority = document.createElement("select");
    selectPriority.name = "priorityEdit";
    selectPriority.id = "priority-select-edit";

    selectPriority.innerHTML = `
  <option value="">--Please choose a priority--</option>
      <option value="normal">Normal</option>
      <option value="priority">Priority</option>
      <option value="urgent">Urgent</option>`;

    priorityWrapper.appendChild(selectPriority);
    //

    //Doctor
    const doctorOption = document.createElement("div");
    const selectdoctor = document.createElement("select");
    selectdoctor.id = "doctor-select-edit";
    selectdoctor.name = "doctor"; //не менять

    selectdoctor.innerHTML = `
          <option value="">--Please choose a doctor--</option>
          <option value="cardiologist">Cardiologist</option>
          <option value="dentist">Dentist</option>
          <option value="therapist">Therapist</option>
      `;
    doctorOption.append(selectdoctor);
    //
    const cardiologistFields = new VisitCardiologist();
    const dentistFields = new VisitDentist();
    const therapistFields = new VisitTherapist();

    const EditOnSelectDoctor = () => {
      const selectedDoctor = document.getElementById("doctor-select-edit");
      const selectDoctorValue = selectedDoctor.value;
      // Найти все элементы с классами для полей и удалить их
      const fieldsToRemove = document.querySelectorAll(
        ".cardiologist-fields, .dentist-fields, .therapist-fields"
      );
      fieldsToRemove.forEach((field) => field.remove());

      if (selectDoctorValue === "cardiologist") {
        doctorOption.insertAdjacentElement(
          "afterend",
          cardiologistFields.render(),
          editSubmit.el
        );
      } else if (selectDoctorValue === "dentist") {
        doctorOption.insertAdjacentElement(
          "afterend",
          dentistFields.render(),
          editSubmit.el
        );
      } else if (selectDoctorValue === "therapist") {
        doctorOption.insertAdjacentElement(
          "afterend",
          therapistFields.render(),
          editSubmit.el
        );
      }
    };

    selectdoctor.addEventListener("change", EditOnSelectDoctor);

    editForm.append(
      headerText,
      editName.render(),
      editReason.render(),
      editDescription.render(),
      priorityWrapper,
      doctorOption,
      editSubmit.render()
    );

    return editForm;
  };
}

export class Login extends Modal {
  constructor(id, classes, text) {
    super(id, classes, text);
  }

  createForm = function () {
    const loginForm = document.createElement("form");
    loginForm.action = "";
    loginForm.id = "login-form";

    const headerText = document.createElement("h2");
    headerText.textContent = "Log In";
    headerText.classList.add("headerText");

    const inputLogin = new Input(
      "email",
      "email",
      true,
      "regLogin",
      "page-input",
      "Ваш логин",
      "ERROR"
    );
    const inputPassword = new Input(
      "password",
      "password",
      true,
      "regPassword",
      "page-input",
      "Ваш пароль",
      "ERROR"
    );
    const inputSubmit = new Input(
      "submit",
      "submitBtn",
      false,
      "submitBtn",
      "login-submit-btn",
      "Вход",
      "ERROR"
    );
    loginForm.append(
      headerText,
      inputLogin.render(),
      inputPassword.render(),
      inputSubmit.render()
    );

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let formData = new FormData(loginForm);
      let dataform = Object.fromEntries(formData.entries());
      const request = new Request("https://ajax.test-danit.com/api/v2/cards");
      request.autorization(dataform);
      this.window.classList.remove("active");
      loginBtn.classList.add("none");
      registerBtn.classList.remove("none");
      request.getALLCards();
    });

    return loginForm;
  };
}

//CREATE VISIT
const registrationForm = new CreateVisit(
  "window",
  ["modal", "lorem"],
  "lorem ipsum dolot"
);

const registerBtn = document.querySelector("#registration-btn");
registerBtn.addEventListener(
  "click",
  registrationForm.openModal.bind(registrationForm)
);
root.append(registrationForm.render(registrationForm.createForm()));

///LOGIN
const loginForm = new Login("window", ["modal", "lorem"], "lorem ipsum dolot");
const loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click", loginForm.openModal.bind(loginForm));
root.append(loginForm.render(loginForm.createForm()));
