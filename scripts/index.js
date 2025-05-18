const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

/*Создания карточек*/
function createCard(element) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  if (!cardElement) {
    console.error("Элемент .card не найден в шаблоне");
    return null;
  }

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (!cardImage || !cardTitle || !deleteButton) {
    console.error("Ошибка в структуре шаблона карточки");
    return null;
  }

  cardImage.src = element.link;
  cardImage.alt = `Пейзажи разных регионов России: ${element.name}`;
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
  const cardElement = createCard(element, () => {
    cardElement.remove();
  });

  if (cardElement) {
    cardList.append(cardElement);
  }
});
