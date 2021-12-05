import { ICard } from "./cardReducer";
import { IActionObject } from "./authReducer";

/**
 * Дефолтное состояние для galleryReducer.
 * @prop  ICard - тип карточки (объект с данными). Галерея состоит из массива с карточками.
 */
const galleryState: ICard[] = [];

/**
 * Перечисление actions для galleryReducer.
 * GET_CARDS - action для получения всех карточек с сервера.
 * ADD_CARD - action для добавления карточки в галерею.
 * LIKE_CARD - action для установки лайка на карточку.
 * DELETE_CARD - action для удаления карточки из галереи.
 */
enum galleryActions {
  GET_CARDS = "GET_CARDS",
  ADD_CARD = "ADD_CARD",
  LIKE_CARD = "LIKE_CARD",
  DELETE_CARD = "DELETE_CARD",
}

/**
 * Редьюсер для взаимодействия с галереей: загрузка всех карточек, добавление новой карточки,
 * лайк карточки, удаление карточки.
 *
 * @param state - дефолтное состояние параметров galleryState.
 * @param action - action, отправленный в galleryReducer.
 */
export const galleryReducer = (
  state: ICard[] = galleryState,
  action: IActionObject
): ICard[] => {
  switch (action.type) {
    case galleryActions.GET_CARDS:
      return [...galleryState, ...action.payload];
    case galleryActions.ADD_CARD:
      return [action.payload, ...state];
    case galleryActions.LIKE_CARD:
      return [
        ...state.map((card) =>
          card._id === action.payload.cardId ? action.payload.newCard : card
        ),
      ];
    case galleryActions.DELETE_CARD: {
      return [...state.filter((card) => card._id !== action.payload)];
    }

    default:
      return state;
  }
};

/**
 * Экспорт actions данного редьюсера для dispatch в App.js.
 */
export const getCardsAction = (payload: ICard[]): IActionObject => ({
  type: galleryActions.GET_CARDS,
  payload: payload,
});

export const addCardAction = (payload: ICard): IActionObject => ({
  type: galleryActions.ADD_CARD,
  payload: payload,
});

export const likeCardAction = (payload: {
  cardId?: string;
  newCard?: ICard;
}): IActionObject => ({
  type: galleryActions.LIKE_CARD,
  payload: payload,
});

export const deleteCardAction = (payload: any): IActionObject => ({
  type: galleryActions.DELETE_CARD,
  payload: payload,
});
