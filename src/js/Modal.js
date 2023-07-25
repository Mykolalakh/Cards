export class Modal {
  constructor(id, classes, text) {
    this.id = id;
    this.classes = classes;
    this.text = text;
  }

  render = function (content = "") {
    this.window = document.createElement("div");
    this.window.id = this.id;
    this.window.classList.add(...this.classes);

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const span = document.createElement("span");
    span.classList.add("close");
    span.innerHTML = "&times;";

    modalContent.append(span, content);
    this.window.append(modalContent);

    span.addEventListener("click", this.closeModal.bind(this));

    return this.window;
  };

  openModal = function () {
    this.window.classList.add("active");
  };

  closeModal = function () {
    this.window.classList.remove("active");
  };
}

export class Input {
  constructor(
    type,
    name,
    required,
    id,
    classes,
    placeHolder,
    textError,
    value
  ) {
    this.type = type;
    this.name = name;
    this.required = required;
    this.id = id;
    this.classes = classes;
    this.placeHolder = placeHolder;
    this.textError = textError;
    this.value = value;
  }
  render() {
    this.input = document.createElement("input");
    this.input.setAttribute("type", this.type);
    this.input.setAttribute("name", this.name);
    if (this.required === true) {
      this.input.setAttribute("required", "");
    }
    this.input.setAttribute("id", this.id);
    this.input.setAttribute("class", this.classes);
    if (this.type === "submit") {
      this.input.setAttribute("value", this.placeHolder);
    } else {
      this.input.setAttribute("placeholder", this.placeHolder);
    }

    return this.input;
  }
}
