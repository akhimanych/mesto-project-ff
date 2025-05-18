const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

/*Создания карточек*/
function createCard(element) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = element.link;
  cardImage.alt = `Изображение места: ${element.name}`;
  cardTitle.textContent = element.name;

  return cardElement;
}

/*Удаления карточек*/
cardList.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__delete-button")) {
    event.target.closest(".card").remove();
  }
});

/*Добавление начальных карточек*/
initialCards.forEach((element) => {
  const cardElement = createCard(element);
  if (cardElement) {
    cardList.append(cardElement);
  }
});
