export const BASE_URL = "https://backend-mesto-evamoer.nomoredomains.rocks";

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.statusText}`);
};

//GET запрос на текущие карточки с сервера
export const getCards = (token) => {
  return fetch(`${BASE_URL}/cards`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

//GET запрос на данные пользователя
export const getUserData = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

//PATCH запрос на обновление данных пользователя
export const updateUserData = (inputValuesData, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: inputValuesData.name,
      about: inputValuesData.about,
    }),
  }).then(checkResponse);
};

//POST запрос на добавление новой карточки
export const addCard = (cardData, token) => {
  return fetch(`${BASE_URL}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then(checkResponse);
};

//DELETE запрос на удаление карточки
export const deleteCard = (cardId, token) => {
  return fetch(`${BASE_URL}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

//PUT и DELETE запрос на добавление/удаление лайка карточке
export const changeLikeCardStatus = (cardId, likeStatus, token) => {
  return fetch(`${BASE_URL}/cards/likes/${cardId}`, {
    method: likeStatus ? "DELETE" : "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

//PATCH запрос на обновление аватара пользователя
export const updateAvatar = ({ avatar }, token) => {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(checkResponse);
};
