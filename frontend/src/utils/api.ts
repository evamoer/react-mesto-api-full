import { inputValues } from "../hooks/validationHook";

/**
 * URL сервера для нашей когорты, вынесенная в константу.
 */
export const BASE_URL: string = "https://mesto.nomoreparties.co/v1/cohort-27";

/**
 * Заголовки запросов, вынесенные в константу.
 */
export const headers: { authorization: string; "Content-Type": string } = {
  authorization: "8db06075-d4ea-471e-8c36-db2b91e349e8",
  "Content-Type": "application/json",
};

/**
 * Обработчик ответа запроса с сервера для разных случаев.
 * @param response - ответ запроса.
 */
const checkResponse = (response: any): Promise<any> => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.statusText}`);
};

/**
 * GET запрос на текущие карточки в галерее.
 */
export const getCards = (): Promise<any> => {
  return fetch(`${BASE_URL}/cards`, {
    headers: headers,
  }).then(checkResponse);
};

/**
 * POST запрос на создание новой карточки в галерее.
 * @param cardData - данные из кормы компонента AddPlacrPopup.
 */
export const addCard = (cardData: inputValues): Promise<any> => {
  return fetch(`${BASE_URL}/cards`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then(checkResponse);
};

/**
 * DELETE запрос на удаление карточки из галереи.
 * @param cardId - id карточки, удаляемой из галереи.
 */
export const deleteCard = (cardId: string): Promise<any> => {
  return fetch(`${BASE_URL}/cards/${cardId}`, {
    method: "DELETE",
    headers: headers,
  }).then(checkResponse);
};

/**
 * Обработчик запроса нажатия на кнопку лайка карточки (установка/снятие лайка):
 * если лайк не был поставлен, то запрос PUT,
 * если лайк уже был поставлен, то запрос DELETE.
 * @param likeStatus - проверка наличия лайка на карточке.
 * @param cardId - id карточки, на которую нажали.
 */
export const changeLikeCardStatus = (
  cardId: string,
  likeStatus: boolean
): Promise<any> => {
  return fetch(`${BASE_URL}/cards/likes/${cardId}`, {
    method: likeStatus ? "DELETE" : "PUT",
    headers: headers,
  }).then(checkResponse);
};

/**
 * GET запрос на данные текущего пользователя.
 */
export const getUserData = (): Promise<any> => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: headers,
  }).then(checkResponse);
};

/**
 * PATCH запрос на обновление данных профиля текущего пользователя.
 * @param inputValuesData - данные из формы компонента EditProfilePopup.
 */
export const updateUserData = (inputValuesData: inputValues): Promise<any> => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({
      name: inputValuesData.name,
      about: inputValuesData.about,
    }),
  }).then(checkResponse);
};

/**
 * PATCH запрос на обновление данных аватара текущего пользователя.
 * @param inputValuesData - данные из формы компонента EditAvatarPopup.
 */
export const updateAvatar = (avatarValue: inputValues): Promise<any> => {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({
      avatar: avatarValue.avatar,
    }),
  }).then(checkResponse);
};
