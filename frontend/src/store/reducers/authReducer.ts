/**
 * Интерфейс для дефолтного состояния authReducer.
 * @prop isRegistered - состояние регистрации пользователя.
 * @prop isLoggedIn - состояние логина пользователя.
 * @prop userEmail - email, введённый пользователем.
 */
export interface IAuth {
  isRegistered: boolean;
  isLoggedIn: boolean;
  userEmail: string;
}

/**
 * Интерфейс для дефолтного состояния Action.
 */
export interface IActionObject {
  type: string;
  payload?: any;
}

/**
 * Дефолтное состояние для authReducer.
 */
const authState: IAuth = {
  isRegistered: false,
  isLoggedIn: false,
  userEmail: "",
};

/**
 * Перечисление actions для authReducer.
 * LOG_IN - action логина пользователя.
 * LOG_OUT - action логаута пользователя.
 * REGISTERED - action для удачной регистрации пользователя.
 * UNREGISTERED - action для неудачной регистрации пользователя.
 */
enum authActions {
  LOG_IN = "LOG_IN",
  LOG_OUT = "LOG_OUT",
  REGISTERED = "REGISTERED",
  UNREGISTERED = "UNREGISTERED",
}

/**
 * Редьюсер для авторизации пользователя.
 *
 * @param state - дефолтное состояние параметров isRegistered, isLoggedIn, userEmail.
 * @param action - action, отправленный в authReducer.
 */
export const authReducer = (
  state: IAuth = authState,
  action: IActionObject
): IAuth => {
  switch (action.type) {
    case authActions.LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        userEmail: action.payload,
      };
    case authActions.LOG_OUT:
      return { ...state, isLoggedIn: false, userEmail: "" };
    case authActions.REGISTERED:
      return { ...state, isLoggedIn: false, isRegistered: true };
    case authActions.UNREGISTERED:
      return { ...state, isLoggedIn: false, isRegistered: false };
    default:
      return state;
  }
};

/**
 * Экспорт actions данного редьюсера для dispatch в App.js.
 */
export const loginAction = (payload: any): IActionObject => ({
  type: authActions.LOG_IN,
  payload: payload,
});
export const logoutAction = (): IActionObject => ({
  type: authActions.LOG_OUT,
});
export const registerAction = (): IActionObject => ({
  type: authActions.REGISTERED,
});
export const unregisterAction = (): IActionObject => ({
  type: authActions.UNREGISTERED,
});
