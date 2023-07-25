import { Input } from "./Modal.js";

export class Visit {
  constructor(formData) {
    this.formData = formData;
  }
}

export class VisitCardiologist extends Visit {
  constructor(formData) {
    super(formData);
    this.el = document.createElement("div");
    this.el.classList.add("cardiologist-fields");

    this.inputAge = new Input(
      "number",
      "age",
      true,
      "visitCard",
      "visit-age",
      "Age",
      "ERROR"
    );
    this.inputBloodPressure = new Input(
      "text",
      "blood-pressure",
      true,
      "visitCard",
      "visit-blood-pressure",
      "Blood Pressure",
      "ERROR"
    );
    this.inputBMI = new Input(
      "number",
      "bmi",
      true,
      "visitCard",
      "visit-bmi",
      "Body Mass Index (BMI)",
      "ERROR"
    );
    this.inputPrevDiseases = new Input(
      "text",
      "prev-diseases",
      true,
      "visitCard",
      "visit-prev-diseases",
      "Previously Treated Diseases",
      "ERROR"
    );

    this.el.append(
      this.inputAge.render(),
      this.inputBloodPressure.render(),
      this.inputBMI.render(),
      this.inputPrevDiseases.render()
    );
  }

  render() {
    return this.el;
  }
}

export class VisitDentist extends Visit {
  constructor(formData) {
    super(formData);
    this.el = document.createElement("div");
    this.el.classList.add("dentist-fields");

    this.inputAge = new Input(
      "number",
      "age",
      true,
      "visitCard",
      "visit-age",
      "Age",
      "ERROR"
    );

    this.el.append(this.inputAge.render());
  }

  render() {
    return this.el;
  }
}

export class VisitTherapist extends Visit {
  constructor(formData) {
    super(formData);
    this.el = document.createElement("div");
    this.el.classList.add("therapist-fields");

    this.inputLastVisit = new Input(
      "date ",
      "date",
      true,
      "visitCard",
      "visit-last-visit",
      "Date of the last visit",
      "ERROR"
    );

    this.el.append(this.inputLastVisit.render());
  }

  render() {
    return this.el;
  }
}
