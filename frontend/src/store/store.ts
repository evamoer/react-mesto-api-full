import { createStore, combineReducers } from "redux";
import { popupReducer } from "./reducers/popupReducer";
import { authReducer } from "./reducers/authReducer";
import { userReducer } from "./reducers/userReducer";
import { galleryReducer } from "./reducers/galleryReducer";
import { cardReducer } from "./reducers/cardReducer";
import { loadingReducer } from "./reducers/loadingReducer";

/**
 * Корневой редьюсер, выключающий в себя все редьюсеры приложения.
 */
const rootReducer = combineReducers({
  popup: popupReducer,
  auth: authReducer,
  user: userReducer,
  cards: galleryReducer,
  card: cardReducer,
  loading: loadingReducer,
});

/**
 * Type корневого редьюсера.
 */

export type RootState = ReturnType<typeof rootReducer>;

/**
 * Store данного приложения.
 */
export const store = createStore(rootReducer);
