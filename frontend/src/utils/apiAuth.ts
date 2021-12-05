/**
 * URL сервера для нашей когорты, вынесенная в константу.
 */
export const BASE_URL: string = "https://auth.nomoreparties.co";

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
 * POST запрос на регистрацию нового пользователя.
 * @param password - пароль регистрируемого пользователя, вводимый в форму компонента Register.
 * @param email - email регистрируемого пользователя, вводимый в форму компонента Register.
 */
export const register = (password: string, email: string): Promise<any> => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};

/**
 * POST запрос на авторизацию пользователя.
 * @param password - пароль авторизируемого пользователя, вводимый в форму компонента Login.
 * @param email - email авторизируемого пользователя, вводимый в форму компонента Login.
 */
export const authorize = (password: string, email: string): Promise<any> => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
};

/**
 * GET запрос на проверку токена пользователя.
 * @param token - токен, хранимый в localStorage пользователя.
 */
export const isTokenValid = (token: string): Promise<any> => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
