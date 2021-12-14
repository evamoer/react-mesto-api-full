import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Интерфейс для Register.
 * @prop onLogin - обработчик данных, вводимых пользователем в форму, при логине.
 */

interface RegisterProps {
  onRegister: (password: string, email: string) => void;
}

/**
 * Интерфейс для данных формы логина пользователя.
 */
interface registerInputValues {
  email: string;
  password: string;
}

/**
 * Register - компонент со страницей регистрации пользователя.
 *
 * @prop onRegister - обработчик данных, вводимых пользователем в форму, при регистрации.
 */
const Register: React.FunctionComponent<RegisterProps> = ({ onRegister }) => {
  /**
   * Параметр состояния инпутов формы.
   */
  const [registerInputValues, setRegisterInputValues] =
    useState<registerInputValues>({
      email: "",
      password: "",
    });

  /**
   * Обработчик ввода данных в инпуты формы.
   */
  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setRegisterInputValues({
      ...registerInputValues,
      [name]: value,
    });
  };

  /**
   * Обработчик сабмита формы.
   */
  const handleFormSubmit = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { password, email } = registerInputValues;
    onRegister(password, email);
  };

  return (
    <section className="sign">
      <h1 className="sign__title">Регистрация</h1>
      <form className="sign__form" onSubmit={handleFormSubmit}>
        <input
          className="sign__input"
          type="email"
          name="email"
          placeholder="Email"
          value={registerInputValues.email}
          onChange={handleInputChange}
        />
        <input
          className="sign__input"
          type="password"
          name="password"
          placeholder="Password"
          value={registerInputValues.password}
          onChange={handleInputChange}
        />
        <button
          className="button sign__button"
          type="submit"
          aria-label="Сохранить изменения"
        >
          Зарегистрироваться
        </button>
      </form>
      <p className="sign__subtitle">
        Уже зарегистрированы?{" "}
        <Link to="sign-in" className="sign__link">
          Войти
        </Link>
      </p>
    </section>
  );
};

export default Register;
