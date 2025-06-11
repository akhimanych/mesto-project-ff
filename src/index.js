import "./pages/index.css";
import { initialCards } from "./components/cards";
import { createCard, handleCardDelete, likeCard } from "./components/card";
import {
  openPopup,
  closePopup,
  closePopupByOverlayOrButton,
} from "./components/modal";

// ========== DOM ==========
const placesList = document.querySelector(".places__list");

// Модальные окна
const popupEditProfile = document.querySelector(".popup_type_edit");
const popuplAddCard = document.querySelector(".popup_type_new-card");
const popuplImage = document.querySelector(".popup_type_image");

// Редактирование профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const formEdit = popupEditProfile?.querySelector(".popup__form");
const nameInput = formEdit?.querySelector(".popup__input_type_name");
const jobInput = formEdit?.querySelector(".popup__input_type_description");

// Добавление карточки
const addCardButton = document.querySelector(".profile__add-button");
const formNewCard = popuplAddCard?.querySelector(".popup__form");
const inputName = formNewCard?.querySelector(".popup__input_type_card-name");
const inputLink = formNewCard?.querySelector(".popup__input_type_url");

// Изображение в попапе
const imagePopupImg = popuplImage?.querySelector(".popup__image");
const imagePopupCaption = popuplImage?.querySelector(".popup__caption");

// ========== Функции ==========
function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      handleCardDelete,
      likeCard,
      openImage
    );
    if (cardElement) {
      placesList.append(cardElement);
    }
  });
}

function openImage({ src, alt }) {
  if (imagePopupImg && imagePopupCaption) {
    imagePopupImg.src = src;
    imagePopupImg.alt = alt;
    imagePopupCaption.textContent = alt.replace("Изображение места: ", "");
  }
  openPopup(popuplImage);
}

function fillProfileForm() {
  if (nameInput && jobInput && profileTitle && profileDescription) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  }
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  if (nameInput && jobInput && profileTitle && profileDescription) {
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
  }
  closePopup(popupEditProfile);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputName.value,
    link: inputLink.value,
  };
  const cardElement = createCard(
    newCard,
    handleCardDelete,
    likeCard,
    openImage
  );
  if (cardElement) {
    placesList.prepend(cardElement);
    inputName.value = "";
    inputLink.value = "";
  }
  closePopup(popuplAddCard);
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", closePopupByOverlayOrButton);
});

editButton?.addEventListener("click", () => {
  fillProfileForm();
  openPopup(popupEditProfile);
});

addCardButton?.addEventListener("click", () => {
  openPopup(popuplAddCard);
});

formEdit.addEventListener("submit", handleProfileSubmit);
formNewCard?.addEventListener("submit", handleNewCardSubmit);

renderInitialCards();
