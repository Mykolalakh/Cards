const searchBtn = document.querySelector(".filter__btn");

const searchFilter = () => {
  const input = document.querySelector(".filter__input");
  const selectedPriority = document.querySelector(".filter__priority");
  const cards = document.querySelectorAll(".card");
  let filter = input.value;
  let filterPriority = selectedPriority.value;

  for (let i = 0; i < cards.length; i++) {
    let title = cards[i].querySelector(".card-list");
    if (
      (cards[i].classList.contains(filterPriority) || filterPriority === "") &&
      title.innerText.toLowerCase().indexOf(filter.toLowerCase()) > -1
    ) {
      cards[i].classList.remove("none");
    } else {
      cards[i].classList.add("none");
    }
  }
};

searchBtn.addEventListener("click", searchFilter);
