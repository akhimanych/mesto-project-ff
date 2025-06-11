const cardTemplate = document.querySelector("#card-template").content;

/*Функция удаления карточки*/
function handleCardDelete(cardElement) {
  cardElement.remove();
}

/*Функция создания карточки*/
function createCard(
  cardData,
  deleteCardCallback,
  onLikeCard,
  onOpenImagePopup
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  if (!cardElement) {
    console.error("Элемент .card не найден в шаблоне");
    return null;
  }

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  if (!cardImage || !cardTitle || !deleteButton || !likeButton) {
    console.error("Ошибка в структуре шаблона карточки");
    return null;
  }

  // Заполняем данные карточки
  cardImage.src = cardData.link;
  cardImage.alt = `Изображение места: ${cardData.name}`;
  cardTitle.textContent = cardData.name;

  // Удаление карточки
  deleteButton.addEventListener("click", () => {
    deleteCardCallback(cardElement);
  });

  // Лайк карточки
  likeButton.addEventListener("click", () => {
    onLikeCard(likeButton);
  });

  // Открытие попапа с изображением
  cardImage.addEventListener("click", () => {
    onOpenImagePopup({
      src: cardImage.src,
      alt: cardImage.alt,
    });
  });

  return cardElement;
}

// Лайк
function likeCard(likeButton) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.remove("card__like-button_is-active");
  } else {
    likeButton.classList.add("card__like-button_is-active");
  }
}

export { createCard, handleCardDelete, likeCard };
