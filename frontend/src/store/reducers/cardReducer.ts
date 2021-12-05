import { IUser, userState } from "./userReducer";
import { IActionObject } from "./authReducer";

/**
 * Интерфейс для дефолтного состояния cardReducer.
 * @prop _id - id карточки.
 * @prop name - название карточки.
 * @prop link - ссылка на изображение карточки.
 * @prop createdAt - время создания карточки.
 * @prop likes - массив пользователей, лайкнувших карточку.
 * @prop owner - объект с данными пользователя, создавшего карточку.
 */
export interface ICard {
  _id: string;
  name: string;
  link: string;
  createdAt: string;
  likes: IUser[];
  owner: IUser;
}

/**
 * Дефолтное состояние для cardReducer.
 */
const cardState: ICard = {
  _id: "",
  name: "",
  link: "",
  createdAt: "",
  likes: [],
  owner: userState,
};

/**
 * Перечисление actions для cardReducer.
 * OPENED_CARD - action для данных карточки, полное изображение которой открывается в попапе.
 * DELETED_CARD - action для данных карточки, удаление которой произойдет при одобрении в попапе.
 */
enum cardActions {
  OPENED_CARD = "OPENED_CARD",
  DELETED_CARD = "DELETED_CARD",
}

/**
 * Редьюсер для получения данных карточки для открытие полного изображения или удаление карточки.
 * @param state - дефолтное состояние параметров cardState.
 * @param action - action, отправленный в cardReducer.
 */
export const cardReducer = (
  state: ICard = cardState,
  action: IActionObject
): ICard => {
  switch (action.type) {
    case cardActions.OPENED_CARD:
      return { ...cardState, ...action.payload };
    case cardActions.DELETED_CARD:
      return { ...cardState, _id: action.payload };
    default:
      return state;
  }
};

/**
 * Экспорт actions данного редьюсера для dispatch в App.js.
 */
export const openedCardAction = (payload: any): IActionObject => ({
  type: cardActions.OPENED_CARD,
  payload: payload,
});
export const deletedCardAction = (payload: any): IActionObject => ({
  type: cardActions.DELETED_CARD,
  payload: payload,
});
