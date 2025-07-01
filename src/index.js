import "./pages/index.css";
import { createCard, handleCardDelete, likeCard } from "./components/card";
import {
  openPopup,
  closePopup,
  closePopupByOverlayOrButton,
} from "./components/modal";
import {
  getUserData,
  getAllCards,
  updateUserInfo,
  postNewCard,
  updateUserAvatar,
} from "./components/api";
import { enableValidation, clearValidation } from "./components/validation";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

// ========== DOM ==========
const placesList = document.querySelector(".places__list");
let userId = "";
let userAvatar = "";
// Модальные окна
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
// Редактирование профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const formEdit = popupEditProfile?.querySelector(".popup__form");
const nameInput = formEdit?.querySelector(".popup__input_type_name");
const jobInput = formEdit?.querySelector(".popup__input_type_description");

// Добавление карточки
const addCardButton = document.querySelector(".profile__add-button");
const formNewCard = popupAddCard?.querySelector(".popup__form");
const inputName = formNewCard?.querySelector(".popup__input_type_card-name");
const inputLink = formNewCard?.querySelector(".popup__input_type_url");

// Изображение в попапе
const imagePopupImg = popupImage?.querySelector(".popup__image");
const imagePopupCaption = popupImage?.querySelector(".popup__caption");

//Функция загрузка кнопки
function loading(form, status) {
  const button = form.querySelector(".popup__button");
  if (status) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

//Функция открытия модального окна с изображением
function onOpenImagePopup(card) {
  imagePopupImg.src = card.link;
  imagePopupImg.alt = card.name;
  imagePopupCaption.textContent = card.name;
  openPopup(popupImage);
}

//Функция добовляет на страницу стартовых карточек
function renderInitialCards() {
  return getAllCards()
    .then((cards) => {
      console.log("Полученные карточки:", cards);
      return cards;
    })
    .catch((error) => {
      console.error("Ошибка при загрузке карточек:", error);
      return [];
    });
}

//Функция редоктирования профиля
function fillProfileForm() {
  if (nameInput && jobInput && profileTitle && profileDescription) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  }
}
//Функция Обновляет данные профиля на странице
function handleProfileSubmit(evt) {
  evt.preventDefault();
  loading(evt.target, true);

  const newName = nameInput.value;
  const newJob = jobInput.value;

  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;

  const newProfile = {
    name: newName,
    about: newJob,
  };

  updateUserInfo(newProfile)
    .then((updatedUser) => {
      console.log("Профиль успешно обновлён:", updatedUser);
    })
    .catch((error) => {
      console.error("Ошибка при сохранении профиля:", error);
    })
    .finally(() => {
      loading(evt.target, false);
    });

  closePopup(popupEditProfile);
}

//Функция Создаёт новую карточку
function handleNewCardSubmit(evt) {
  evt.preventDefault();
  loading(evt.target, true);

  const newCard = {
    name: inputName.value,
    link: inputLink.value,
  };

  postNewCard(newCard)
    .then((card) => {
      const cardElement = createCard(
        card,
        userId,
        handleCardDelete,
        likeCard,
        onOpenImagePopup
      );

      if (cardElement) {
        placesList.prepend(cardElement);
      }

      evt.target.reset();
      closePopup(popupAddCard);
    })
    .catch((error) => {
      console.error("Ошибка при добавлении карточки:", error);
    })
    .finally(() => {
      loading(evt.target, false);
    });
}
// Функция находит все попапы на странице
document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", closePopupByOverlayOrButton);
});

//Функция обработчик клика на кнопку редактирования профиля
editButton?.addEventListener("click", () => {
  fillProfileForm();
  openPopup(popupEditProfile);
});

//Функция обработчик клика на кнопку добавления новой карточки ,
addCardButton?.addEventListener("click", () => {
  openPopup(popupAddCard);
});

formEdit.addEventListener("submit", handleProfileSubmit);
formNewCard?.addEventListener("submit", handleNewCardSubmit);

//Редактирование аватара
const profileImageButton = document.querySelector(".profile__image-button");
const popupUpdateAvatar = document.querySelector(".popup__update_avatar");
const popupInputAvatar = document.querySelector(".popup__input_avatar");

profileImageButton.addEventListener("click", () => {
  clearValidation(popupUpdateAvatar, validationConfig);
  openPopup(popupUpdateAvatar);
});

const profileImage = document.querySelector(".profile__image");

// Функция редактирования аватара
function handleUpdateAvatarSubmit(evt) {
  evt.preventDefault();
  loading(evt.target, true);

  updateUserAvatar({
    avatar: popupInputAvatar.value,
  })
    .then((result) => {
      profileImage.style.backgroundImage = `url(${result.avatar})`;
      closePopup(popupUpdateAvatar);
    })

    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading(evt.target, false);
    });
}

const avatar = document.querySelector('form[name="avatar"]');

avatar.addEventListener("submit", handleUpdateAvatarSubmit);

Promise.all([getUserData(), renderInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    userAvatar = userData.avatar;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userAvatar})`;

    initialCards.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        userId,
        handleCardDelete,
        likeCard,
        onOpenImagePopup
      );
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log("Ошибка загрузки данных:", err);
  });
