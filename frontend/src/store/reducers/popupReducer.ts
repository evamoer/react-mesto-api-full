import { IActionObject } from './authReducer';

/**
 * Интерфейс для дефолтного состояния popupReducer.
 */
export interface IPopup {
  editProfilePopupState: boolean,
  editAvatarPopupState: boolean,
  addPlacePopupState: boolean,
  deletePlacePopupState: boolean,
  imagePopupState: boolean,
  infoTooltipState: boolean,
}

/**
 * Дефолтное состояние для popupReducer.
 */
const popupState: IPopup = {
  editProfilePopupState: false,
  editAvatarPopupState: false,
  addPlacePopupState: false,
  deletePlacePopupState: false,
  imagePopupState: false,
  infoTooltipState: false,
};

/**
 * Перечисление actions для popupReducer.
 * OPEN - action для открытия попапа.
 * CLOSE - action для закрытия попапа.
 */
enum popupActions {
  OPEN = "OPEN",
  CLOSE = "CLOSE"
}

/**
 * Функция-редьюсер для состояний попапов.
 *
 * @param state - дефолтное состояние всех попапов (true - попап открыт, false - попап закрыт).
 * @param action - action, отправленный в popupReducer.
 */
export const popupReducer = (
  state: IPopup = popupState,
  action: IActionObject): IPopup => {
  switch (action.type) {
    case popupActions.OPEN:
      return { ...state, [`${action.payload}State`]: true }
    case popupActions.CLOSE:
      return popupState;
    default:
      return state;
  }
};

/**
 * Экспорт actions данного редьюсера для dispatch в App.js
 */
export const openPopupAction = (payload: string): IActionObject => ({
  type: popupActions.OPEN,
  payload,
});
export const closePopupAction = (): IActionObject => ({ type: popupActions.CLOSE });
