import React from "react";

export default function InfoTooltip({ isOpen, onClose, isRegistered }) {
  const popupClassName = `popup ${isOpen && "popup_opened"}`;

  const title = isRegistered
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";

  const signClassName = `popup__info-sign ${
    isRegistered
      ? "popup__info-sign_type_success"
      : "popup__info-sign_type_fail"
  }`;

  return (
    <div className={popupClassName} onMouseDown={onClose}>
      <div className="popup__container">
        <button
          className="button popup__button_type_close"
          onClick={onClose}
          type="button"
          aria-label="Закрыть всплывающее окно"
        ></button>
        <div className={signClassName}></div>
        <h2 className="popup__title popup__info-title">{title}</h2>
      </div>
    </div>
  );
}
