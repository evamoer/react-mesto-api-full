import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [registerInputValues, setRegisterInputValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setRegisterInputValues({
      ...registerInputValues,
      [name]: value,
    });
  };

  const handleFormSubmit = (evt) => {
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
}
