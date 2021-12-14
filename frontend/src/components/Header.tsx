import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import logoPath from "../images/logo.svg";

/**
 * Интерфейс для Header.
 * @prop onLogout - обработчик клика на кнопку Выйти.
 */

interface HeaderProps {
  onLogout: () => void;
}

/**
 * Header - компонент хэдера.
 */
const Header: React.FunctionComponent<HeaderProps> = ({ onLogout }) => {
  /**
   * Хук для определения текущего URL.
   */
  const location = useLocation();

  /**
   * Параметр с текущим URL.
   */
  const currentLocation = location.pathname;

  /**
   * Параметры статуса логина пользователя и его email.
   */
  const { isLoggedIn, userEmail } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <header className="header page__header">
      <img src={logoPath} alt="Лого Mesto Russia" className="header__logo" />
      <div className="header__navigation">
        {isLoggedIn && currentLocation === "/" && (
          <>
            <p className="header__user-email">{userEmail}</p>
            <Link
              to="sign-up"
              className="header__link header__link_type_logout"
              onClick={onLogout}
            >
              Выйти
            </Link>
          </>
        )}
        {!isLoggedIn && currentLocation === "/sign-up" && (
          <Link to="sign-in" className="header__link">
            Войти
          </Link>
        )}
        {!isLoggedIn && currentLocation === "/sign-in" && (
          <Link to="sign-up" className="header__link">
            Регистрация
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
