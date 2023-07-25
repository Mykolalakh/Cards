import { Component } from "./Component.js";
import { Request } from "./Request.js";
import { EditVisit } from "./forms.js";

export class Card extends Component {
  constructor(dataCard) {
    super();
    this.dataCard = dataCard;
  }
  createCard() {
    let { id, doctor, fullname } = this.dataCard;
    this.card = this.createElement("div", ["card"]);
    this.card.id = id;
    this.card.classList.add(`${this.dataCard.priority}`);
    this.cross = this.createElement("div", ["close"]);
    this.cross.innerHTML = "&times";
    this.buttonMore = this.createElement("button", ["show-more"], "show more");
    this.buttonEdit = this.createElement("button", ["button-edit"], "edit");
    this.card.innerHTML = `<ul class='card-list'>
      <li class="card-item">Visit to the:${doctor}</li>
      <li class="card-item">Fullname:${fullname}</li>
      </ul>
      `;
    const cardList = this.card.querySelector(".card-list");
    const skipKeys = ["doctor", "fullname", "id"];
    for (const key in this.dataCard) {
      if (skipKeys.includes(key)) {
        continue;
      }
      const li = this.createElement(
        "li",
        ["card-item"],
        `${key}:${this.dataCard[key]}`
      );
      li.style.display = "none";
      cardList.appendChild(li);
    }

    this.buttonMore.addEventListener("click", (e) => {
      e.preventDefault();
      this.showMore();
    });
    this.buttonEdit.addEventListener("click", () => {
      this.edit();
    });
    this.cross.addEventListener("click", () => {
      this.removeCard(this.card.id);
    });

    this.card.append(this.buttonMore, this.buttonEdit);

    this.card.prepend(this.cross);

    const cardWraper = document.querySelector(".wrapper-cards");
    cardWraper.prepend(this.card);
  }
  showMore() {
    const cardItem = this.card.querySelectorAll(".card-item");
    cardItem.forEach((item) => {
      item.style.display = "block";
    });

    this.buttonMore.style.display = "none";
  }

  edit() {
    const root = document.querySelector("#root");
    const editVisit = new EditVisit(
      "window",
      ["modal", "lorem", "active"],
      "lorem ipsum dolot"
    );

    editVisit.openModal.bind(editVisit);
    console.log(editVisit.render(editVisit.editForm()));
    root.append(editVisit.render(editVisit.editForm()));
    const editSubmit = document.querySelector(".visit-edit-btn");
    const editForm = document.querySelector("#edit-form");

    //событие сабмит
    editForm.addEventListener("submit", (event) => {
      event.preventDefault();
      let formData = new FormData(editForm);
      let formDataObj = Object.fromEntries(formData.entries());
      console.log(formDataObj);
      console.log(formDataObj.priorityEdit);
      const request = new Request("https://ajax.test-danit.com/api/v2/cards");

      request.editCard(this.card.id, formDataObj).then((res) => {
        let { id, doctor, fullname } = res;
        const ul = this.card.querySelector(".card-list");
        ul.innerHTML = "";
        ul.innerHTML = `
            <li class="card-item">Visit to the:</span>${doctor}</li>
            <li class="card-item">Fullname:${fullname}</li>
            `;
        for (const key in res) {
          if (key === "doctor" || key === "fullname" || key === "id") continue;
          const li = document.createElement("li");
          li.classList.add("card-item");

          li.textContent = `${key}: ${res[key]}`;
          // удаляю все классы у карточки
          this.card.classList.remove(...this.card.classList);
          console.log(this.dataCard.priority);
          // добаляется классы card и приорететность
          this.card.classList.add("card");
          this.card.classList.add(`${formDataObj.priorityEdit}`);
          li.style.display = "none";
          ul.appendChild(li);
          this.buttonMore.style.display = "inline-block";
        }
      });
      const modalWind = document.querySelector(".active");

      modalWind.remove();
    });
  }
  removeCard(id) {
    let request = new Request("https://ajax.test-danit.com/api/v2/cards");
    request.deleteCard(id);
    this.card.remove();
  }
}
