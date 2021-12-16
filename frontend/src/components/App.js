import React, { useState, useEffect, useCallback } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as api from "../utils/api";
import * as apiAuth from "../utils/apiAuth";

//импорт компонентов
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

const App = () => {
  //переменные для регистрации и авторизации пользователя
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  //переменные для попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  //переменные для функционала галереи
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    cohort: "",
    _id: "",
  });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");

  //функция регистрации пользователя
  const handleRegister = (password, email) => {
    apiAuth
      .register(password, email)
      .then(() => {
        setIsRegistered(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((error) => {
        setIsRegistered(false);
        setIsInfoTooltipOpen(true);
        handleError(error);
      });
  };

  //проверка токена в localStorage: если да, то устанавливаем, что пользователь залогинен
  const checkUserToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      apiAuth
        .isTokenValid(token)
        .then((user) => {
          const { email } = user;
          setUserEmail(email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch(handleError);
    }
  }, [history]);

  //проверка при открытии сайта: залогинен ли текущий пользователь
  useEffect(() => {
    checkUserToken();
  }, [checkUserToken]);

  //обработка ошибок при выполнении запросов
  const handleError = (error) => {
    console.log(`Ошибка: ${error}`);
  };

  //функция логина пользователя
  const handleLogin = (password, email) => {
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

  //функция выхода из аккаунта текущего пользователя
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserEmail("");
    setIsLoggedIn(false);
    history.push("/sign-in");
  };

  //запрос всех карточек с сервера, обновление стейта с карточками,
  //обработчики лайка и удаления карточки
  useEffect(() => {
    api
      .getCards(token)
      .then((cardsData) => setCards(cardsData))
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, [token]);

  const handleCardLike = (likes, cardId) => {
    const isLiked = likes.some((user) => user === currentUser._id);
    api
      .changeLikeCardStatus(cardId, isLiked, token)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === cardId ? newCard : c)));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  };

  const approveDeletePlace = () => {
    setIsDeletePlacePopupOpen(false);
    if (deletedCard !== null) {
      api
        .deleteCard(deletedCard._id, token)
        .then(
          setCards((state) => state.filter((c) => c._id !== deletedCard._id))
        )
        .then(() => closeAllPopups())
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  };

  const handleCardDeleteButtonClick = (cardId) => {
    setIsDeletePlacePopupOpen(true);
    setEscClickListener();
    setDeletedCard({
      ...deletedCard,
      _id: cardId,
    });
  };

  const handleAddPlaceSubmit = (inputValuesData) => {
    setIsLoading(true);
    api
      .addCard(inputValuesData, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  };

  //запрос данных текущего пользователя,
  //обработчики обновления данных пользователя и его аватара
  useEffect(() => {
    api
      .getUserData(token)
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, [token]);

  const handleUpdateUser = (inputValuesData) => {
    setIsLoading(true);
    api
      .updateUserData(inputValuesData, token)
      .then((data) =>
        setCurrentUser({ ...currentUser, name: data.name, about: data.about })
      )
      .then(() => closeAllPopups())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (inputValuesData) => {
    setIsLoading(true);
    api
      .updateAvatar(inputValuesData, token)
      .then((data) => setCurrentUser({ ...currentUser, avatar: data.avatar }))
      .then(() => closeAllPopups())
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  };

  //функции открытия попапов
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    setEscClickListener();
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    setEscClickListener();
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    setEscClickListener();
  };

  const handleCardClick = (card) => {
    setSelectedCard({
      ...selectedCard,
      name: card.name,
      link: card.link,
    });
    setIsImagePopupOpen(true);
    setEscClickListener();
  };

  //функции слушателей закрытия попапов
  const setEscClickListener = () => {
    document.addEventListener("keydown", handleEscClick);
  };

  //функция закрытия попапа по нажатию на Esc
  const handleEscClick = (evt) => {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  };

  //функция закрытия попапов
  const closeAllPopups = (evt) => {
    if (evt && evt.target !== evt.currentTarget) {
      return;
    }
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setDeletedCard(null);
    document.removeEventListener("keydown", handleEscClick);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
      <Switch>
        <Route exact path="/sign-in">
          <Login onLogin={handleLogin} />
        </Route>
        <Route exact path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>
        <ProtectedRoute
          path="/"
          isLoggedIn={isLoggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onImageCard={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteButtonClick}
        />
        {isLoggedIn && <Footer />}
      </Switch>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        submitButtonText={!isLoading ? "Сохранить" : "Сохранение..."}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        submitButtonText={!isLoading ? "Сохранить" : "Сохранение..."}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        submitButtonText={!isLoading ? "Создать" : "Сохранение..."}
      />
      <DeletePlacePopup
        isOpen={isDeletePlacePopupOpen}
        onClose={closeAllPopups}
        onApproveDeletePlace={approveDeletePlace}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isRegistered={isRegistered}
      />
    </CurrentUserContext.Provider>
  );
};

export default App;
