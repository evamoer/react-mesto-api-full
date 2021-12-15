import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [loginInputValues, setLoginInputValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setLoginInputValues({
      ...loginInputValues,
      [name]: value,
    });
  };

  const handleFormSubmit = (evt) => {
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
}
