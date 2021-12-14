import React, { useState } from "react";

/**
 * Интерфейс для Login.
 * @prop onLogin - обработчик данных, вводимых пользователем в форму, при логине.
 */

interface LoginProps {
  onLogin: (password: string, email: string) => void;
}

/**
 * Интерфейс для данных формы логина пользователя.
 */
interface loginInputValues {
  email: string;
  password: string;
}

/**
 * Login - компонент со страницей логина пользователя.
 */
const Login: React.FunctionComponent<LoginProps> = ({ onLogin }) => {
  /**
   * Параметр состояния инпутов формы.
   */
  const [loginInputValues, setLoginInputValues] = useState<loginInputValues>({
    email: "",
    password: "",
  });

  /**
   * Обработчик ввода данных в инпуты формы.
   */
  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setLoginInputValues({
      ...loginInputValues,
      [name]: value,
    });
  };

  /**
   * Обработчик сабмита формы.
   */
  const handleFormSubmit = (evt: React.ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { password, email } = loginInputValues;
    onLogin(password, email);
  };

  return (
    <section className="sign">
      <h1 className="sign__title">Вход</h1>
      <form className="sign__form" onSubmit={handleFormSubmit}>
        <input
          className="sign__input"
          type="email"
          name="email"
          placeholder="Email"
          value={loginInputValues.email}
          onChange={handleInputChange}
        />
        <input
          className="sign__input"
          type="password"
          name="password"
          placeholder="Password"
          value={loginInputValues.password}
          onChange={handleInputChange}
        />
        <button
          className="button sign__button"
          type="submit"
          aria-label="Сохранить изменения"
        >
          Войти
        </button>
      </form>
    </section>
  );
};

export default Login;
