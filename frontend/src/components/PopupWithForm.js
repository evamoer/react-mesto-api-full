export default function PopupWithForm({
  title,
  name,
  submitButtonText,
  isOpen,
  onClose,
  onSubmit,
  children,
  isValid,
}) {
  const popupClassName = `popup ${isOpen && "popup_opened"}`;

  return (
    <div className={popupClassName} onMouseDown={onClose}>
      <div className="popup__container">
        <button
          className="button popup__button_type_close"
          onClick={onClose}
          type="button"
          aria-label="Закрыть всплывающее окно"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          action="/"
          method="POST"
          onSubmit={onSubmit}
          name={name}
        >
          {children}
          <button
            className={`button popup__button_type_submit ${
              !isValid && "popup__button_type_submit_disabled"
            }`}
            type="submit"
            aria-label="Сохранить изменения"
          >
            {submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}
