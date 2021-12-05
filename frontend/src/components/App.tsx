import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as api from "../utils/api";
import * as apiAuth from "../utils/apiAuth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { RootState } from "../store/store";
import { ICard } from "../store/reducers/cardReducer";
import { IUser } from "../store/reducers/userReducer";
import { inputValues } from "../hooks/validationHook";
import {
  openPopupAction,
  closePopupAction,
} from "../store/reducers/popupReducer";
import {
  loginAction,
  logoutAction,
  registerAction,
  unregisterAction,
} from "../store/reducers/authReducer";
import {
  getUserAction,
  updateProfileAction,
  updateAvatarAction,
} from "../store/reducers/userReducer";
import {
  getCardsAction,
  addCardAction,
  likeCardAction,
  deleteCardAction,
} from "../store/reducers/galleryReducer";
import {
  openedCardAction,
  deletedCardAction,
} from "../store/reducers/cardReducer";
import {
  loadingDataAction,
  loadedDataAction,
} from "../store/reducers/loadingReducer";

/**
 * App - главный компонент приложения.
 * Включает в себя все компоненты и логику работу приложения.
 */
const App: React.FunctionComponent = () => {
  /**
   * Хук для подключения dispatch.
   */
  const dispatch = useDispatch();

  /**
   * Хук для подключения history.
   */
  const history = useHistory();

  /**
   * Параметр статуса логина пользователя
   */
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  /**
   * Параметр с данными текущего пользователя.
   */
  const currentUser = useSelector((state: RootState) => state.user);

  /**
   * Параметр карточки: opened - для полного изображения карточки, deleted - для удаляемой карточки.
   */
  const card = useSelector((state: RootState) => state.card);

  /**
   * Функция открытия попапа. Дополнительно устанавливается слушатель нажатия на Esc.
   *
   * @param popupType - тип попапа
   */

  const onOpenPopup = (popupType: string): void => {
    dispatch(openPopupAction(popupType));
    document.addEventListener("keydown", handleEscClick);
  };

  /**
   * Функция закрытия попапа.
   */
  const closePopup = () => {
    dispatch(closePopupAction());
    document.removeEventListener("keydown", handleEscClick);
  };

  /**
   * Обработчик нажатия на оверлэй.
   */
  const handleOverlayClick = (evt: React.MouseEvent) => {
    if (evt.target === evt.currentTarget) {
      closePopup();
    }
  };

  /**
   * Обработчик нажатия на Esc.
   */
  const handleEscClick = (evt: KeyboardEvent) => {
    if (evt.key === "Escape") {
      closePopup();
    }
  };

  /**
   * Обработчик регистрации пользователя:
   * отправляет запрос к api с параметрами password, email.
   *
   * @param password - пароль, вводимый пользователем
   * @param email - email, вводимый пользователя
   */
  const handleRegister = (password: string, email: string): void => {
    apiAuth
      .register(password, email)
      .then(() => {
        dispatch(registerAction());
        onOpenPopup("infoTooltip");
      })
      .catch((error) => {
        dispatch(unregisterAction());
        onOpenPopup("infoTooltip");
        handleError(error);
      });
  };

  /**
   * Хук для проверки наличия токена пользователя в LocalStorage при открытии сайта.
   */
  useEffect((): void => {
    checkUserToken();
  }, []);

  /**
   * Проверка наличия токена в localStorage.
   * При его наличии, устанавливаем, что пользователь залогинен, и перенаправляем на "/".
   *
   */
  const checkUserToken = (): void => {
    const token = localStorage.getItem("token");
    if (token) {
      apiAuth
        .isTokenValid(token)
        .then((user) => {
          const { data } = user;
          const { email } = data;
          dispatch(loginAction(email));
          history.push("/");
        })
        .catch(handleError);
    }
  };

  /**
   * Обработчик ошибок, возникающих при запросах.
   */
  const handleError = (error: string): void => {
    console.log(error);
  };

  /**
   * Обработчик статуса логина пользователя:
   * отправляет запрос к api с параметрами password, email.
   *
   * @param password - пароль, вводимый пользователем
   * @param email - email, вводимый пользователя
   */
  const handleLogin = (password: string, email: string): void => {
    apiAuth
      .authorize(password, email)
      .then((data) => {
        if (data) {
          const { token } = data;
          localStorage.setItem("token", token);
          checkUserToken();
        }
      })
      .catch(handleError);
  };

  /**
   * Обработчик разлогинивания пользователя из аккаунта:
   * удаляем токен из LocalStorage.
   */
  const handleLogout = (): void => {
    localStorage.removeItem("token");
    dispatch(logoutAction());
    history.push("/sign-in");
  };

  /**
   * Хук с запросом к api всех карточек с сервера, обновления стейта с карточками.
   */
  useEffect((): void => {
    api
      .getCards()
      .then((cardsData) => dispatch(getCardsAction(cardsData)))
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  /**
   * Обработчик клика на кнопку лайка карточки.
   *
   * @param likes - массив с пользователями, лайкнувшими карточку.
   * @param cardId - id карточки, выбранной для установки лайка.
   */
  const handleCardLike = (likes: IUser[], cardId: string): void => {
    const isLiked = likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(cardId, isLiked)
      .then((newCard) => {
        dispatch(likeCardAction({ cardId: cardId, newCard: newCard }));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  /**
   * Функция подтверждения удаления карточки.
   */
  const onApproveDeletePlace = (): void => {
    if (card._id) {
      api
        .deleteCard(card._id)
        .then(() => dispatch(deleteCardAction(card._id)))
        .then(() => closePopup())
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  };

  /**
   * Обработчик клика по кнопке удаления карточки.
   *
   * @param cardId - id карточки, выбранной для удаления.
   */
  const handleCardDeleteButtonClick = (cardId: string): void => {
    onOpenPopup("deletePlacePopup");
    dispatch(deletedCardAction(cardId));
  };

  /**
   * Обработчик клика на сабмит формы добавления новой карточки.
   *
   * @param inputValuesData - данные новой карточки для добавления в галерею, введенные в форму пользователем..
   */
  const handleAddPlaceSubmit = (inputValuesData: inputValues): void => {
    dispatch(loadingDataAction());
    api
      .addCard(inputValuesData)
      .then((newCard) => dispatch(addCardAction(newCard)))
      .then(() => closePopup())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => dispatch(loadedDataAction()));
  };

  /**
   * Хук с запросом к api данных текущего пользователя.
   */
  useEffect((): void => {
    api
      .getUserData()
      .then((user) => dispatch(getUserAction(user)))
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  /**
   * Обработчик клика на кнопку удаления карточки.
   *
   * @param inputValuesData - новые данные профиля, введенные в форму пользователем.
   */
  const handleUpdateUser = (inputValuesData: inputValues): void => {
    dispatch(loadingDataAction());
    api
      .updateUserData(inputValuesData)
      .then((data) => dispatch(updateProfileAction(data)))
      .then(() => closePopup())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => dispatch(loadedDataAction()));
  };

  /**
   * Обработчик клика на кнопку удаления карточки.
   *
   * @param inputValuesData - новые данные аватара (ссылка на изображение), введенные в форму пользователем.
   */
  const handleUpdateAvatar = (avatarValue: inputValues): void => {
    dispatch(loadingDataAction());
    api
      .updateAvatar(avatarValue)
      .then((data) => dispatch(updateAvatarAction(data)))
      .then(() => closePopup())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => dispatch(loadedDataAction()));
  };

  /**
   * Обработчик клика на изображение карточки.
   * По клику открывается попап с полным изображением.
   *
   * @param card - объект с данными карточки (название name, ссылка link)
   */
  const handleCardClick = (card: ICard) => {
    dispatch(openedCardAction(card));
    onOpenPopup("imagePopup");
  };

  return (
    <>
      <Header onLogout={handleLogout} />
      <Switch>
        <Route exact path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <Route exact path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>
        <ProtectedRoute
          component={Main}
          onOpenPopup={onOpenPopup}
          onImageCard={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteButtonClick}
        />
        {isLoggedIn && <Footer />}
      </Switch>
      <EditProfilePopup
        onMouseDown={handleOverlayClick}
        onClose={closePopup}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        onMouseDown={handleOverlayClick}
        onClose={closePopup}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        onMouseDown={handleOverlayClick}
        onClose={closePopup}
        onAddPlace={handleAddPlaceSubmit}
      />
      <DeletePlacePopup
        onMouseDown={handleOverlayClick}
        onClose={closePopup}
        onApproveDeletePlace={onApproveDeletePlace}
      />
      <ImagePopup onMouseDown={handleOverlayClick} onClose={closePopup} />
      <InfoTooltip onMouseDown={handleOverlayClick} onClose={closePopup} />
    </>
  );
};

export default App;
