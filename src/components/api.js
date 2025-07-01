const configServer = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-41/",
  headers: {
    Authorization: "844a6d3c-6629-4629-bf68-17161ba22f81",
    "Content-Type": "application/json",
  },
};

// Функция обработки результата
function getresult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
}

// Функция получения информации о пользователи
const getUserData = () => {
  return fetch(`${configServer.baseUrl}/users/me`, {
    headers: configServer.headers,
  }).then((res) => getresult(res));
};

//Функция запроса карт с сервера
const getAllCards = () => {
  return fetch(`${configServer.baseUrl}/cards`, {
    headers: configServer.headers,
  }).then((res) => getresult(res));
};

//Функция обновления информации
const updateUserInfo = (newProfile) => {
  return fetch(`${configServer.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configServer.headers,
    body: JSON.stringify({
      name: newProfile.name,
      about: newProfile.about,
    }),
  }).then((res) => getresult(res));
};

//Функция добавление новой карточки на сервер
const postNewCard = (newCard) => {
  return fetch(`${configServer.baseUrl}/cards`, {
    method: "POST",
    headers: configServer.headers,
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    }),
  }).then((res) => getresult(res));
};

//Функция добавления лайка на сервер
const putLikeCard = (cardId) => {
  return fetch(`${configServer.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: configServer.headers,
    body: JSON.stringify({}),
  }).then((res) => getresult(res));
};

//Функция удаления карточки
const delLikeCard = (cardId) => {
  return fetch(`${configServer.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: configServer.headers,
  }).then((res) => getresult(res));
};

//Функция удаления карточки по ID
const deleteCardId = (cardId) => {
  return fetch(`${configServer.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: configServer.headers,
  }).then((res) => getresult(res));
};

//Функция изменения аватара
const updateUserAvatar = (avatar) => {
  return fetch(`${configServer.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: configServer.headers,
    body: JSON.stringify({
      avatar: avatar.avatar,
    }),
  }).then((res) => getresult(res));
};

export {
  getUserData,
  getAllCards,
  updateUserInfo,
  postNewCard,
  putLikeCard,
  delLikeCard,
  deleteCardId,
  updateUserAvatar,
};
