import { initialCards } from "./scripts/cards";
import './pages/index.css';

const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");

/*Функция удаления карточки*/
function handleCardDelete(cardElement) {
  cardElement.remove();
}

/*Функция создания карточки*/
function createCard(cardData, deleteCardCallback) {
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

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", () => {
    deleteCardCallback(cardElement);
  });

  return cardElement;
}

/*Добавляем начальные карточки*/
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, handleCardDelete);
  if (cardElement) {
    cardList.append(cardElement);
  }
});
