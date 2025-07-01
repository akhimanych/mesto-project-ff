import { putLikeCard, delLikeCard, deleteCardId } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

/*Функция удаления карточки*/
function handleCardDelete(card, cardId) {
  return deleteCardId(cardId)
    .then((result) => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

/*Функция создания карточки*/
function createCard(
  cardData,
  userId,
  deleteCardCallback,
  LikeCard,
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
  const likeCounter = cardElement.querySelector(".card__like-counter");

  if (
    !cardImage ||
    !cardTitle ||
    !deleteButton ||
    !likeButton ||
    !likeCounter
  ) {
    console.error("Ошибка в структуре шаблона карточки");
    return null;
  }

  // Заполняем данные карточки
  cardImage.src = cardData.link;
  cardImage.alt = `Изображение места: ${cardData.name}`;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (userId === cardData.owner._id) {
    deleteButton.addEventListener("click", () => {
      deleteCardCallback(cardElement, cardData._id);
    });
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener("click", () => {
    LikeCard(likeButton, cardData._id, likeCounter);
  });

  cardImage.addEventListener("click", () => {
    onOpenImagePopup(cardData);
  });

  return cardElement;
}

// Лайк
function likeCard(evt, cardId, likeCounter) {
  const like = evt.classList.contains("card__like-button_is-active")
    ? delLikeCard
    : putLikeCard;
  like(cardId)
    .then((result) => {
      evt.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

export { createCard, handleCardDelete, likeCard };
