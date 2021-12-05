import { IActionObject } from './authReducer';

/**
 * Интерфейс для дефолтного состояния userReducer.
 */
export interface IUser {
  name: string,
  about: string,
  avatar: string,
  cohort: string,
  _id: string,
}

/**
 * Дефолтное состояние для userReducer.
 */
export const userState: IUser = {
  name: "",
  about: "",
  avatar: "",
  cohort: "",
  _id: "",
};
const GET_USER: string = "GET_USER";
const UPDATE_PROFILE: string = "UPDATE_PROFILE";
const UPDATE_AVATAR: string = "UPDATE_AVATAR";

/**
 * Функция-редьюсер для взаимодействия с данными текущего пользователя.
 *
 * @param state - дефолтное состояние данных текущего пользователя.
 * @param action - action, отправленный в userReducer.
 */
export const userReducer = (
  state: IUser = userState,
  action: IActionObject): IUser => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        name: action.payload.name,
        about: action.payload.about,
        avatar: action.payload.avatar,
        cohort: action.payload.cohort,
        _id: action.payload._id,
      };
    }
    case UPDATE_PROFILE:
      return {
        ...state,
        name: action.payload.name,
        about: action.payload.about,
      };
    case UPDATE_AVATAR:
      return {
        ...state,
        avatar: action.payload.avatar,
      };
    default:
      return state;
  }
};

/**
 * Экспорт actions данного редьюсера для dispatch в App.js
 */
export const getUserAction = (payload: IUser): IActionObject => ({
  type: GET_USER,
  payload: payload,
});

export const updateProfileAction = (payload: {
  name: string,
  about: string,
}): IActionObject => ({
  type: UPDATE_PROFILE,
  payload: payload,
});

export const updateAvatarAction = (payload: {
  avatar: string,
}): IActionObject => ({
  type: UPDATE_AVATAR,
  payload: payload,
});
