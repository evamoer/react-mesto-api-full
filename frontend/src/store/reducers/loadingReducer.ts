import { IActionObject } from './authReducer';

/**
 * Интерфейс для дефолтного состояния loadingReducer.
 */
export interface ILoading {
  isLoading: boolean
}

/**
 * Дефолтное состояние для loadingReducer.
 */
const loadingState: ILoading = {
  isLoading: false,
};

/**
 * Перечисление actions для loadingReducer.
 * LOADING - action для статуса загрузки информации на сервер.
 * LOADED - action для статуса окончания загрузки информации на сервер.
 */
enum loadingActions {
  LOADING = "LOADING",
  LOADED = "LOADED"
}

/**
 * Редьюсер для статуса загрузки данных на сервер.
 *
 * @param state - дефолтное состояние параметров loadingState.
 * @param action - action, отправленный в loadingReducer.
 */
export const loadingReducer = (
  state: ILoading = loadingState,
  action: IActionObject,
): ILoading => {
  switch (action.type) {
    case loadingActions.LOADING:
      return { ...state, isLoading: true };
    case loadingActions.LOADED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

/**
 * Экспорт actions данного редьюсера для dispatch в App.js.
 */
export const loadingDataAction = (): IActionObject => ({ type: loadingActions.LOADING });
export const loadedDataAction = (): IActionObject => ({ type: loadingActions.LOADED });
