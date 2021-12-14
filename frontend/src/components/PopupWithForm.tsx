import React from "react";

/**
 * Интерфейс для PopupWithForm.
 * @prop title - название формы, отображающейся в попапе.
 * @prop name - имя формы.
 * @prop submitButtonText - текст кнопки сабмита (меняется при выполнении запросы к api).
 * @prop isOpen - состояние попапа: открыт/закрыт.
 * @prop onClose - функция закрытия попапа.
 * @prop onMouseDown - обработчик закрытия попапа по клику на оверлэй.
 * @prop onSubmit - обработчик сабмита формы.
 * @prop children - дочерние элементами формы (инпуты).
 * @prop isValid - состояние валидности формы.
 */
interface PopupWithFormProps {
  title: string;
  name: string;
  submitButtonText: string;
  isOpen: boolean;
  onMouseDown: (evt: React.MouseEvent) => void;
  onClose: () => void;
  onSubmit: (evt: React.ChangeEvent<HTMLFormElement>) => void;
  children: React.ReactElement | React.ReactNode;
  isValid: boolean;
}

/**
 * PopupWithForm - компонент попапа с формой.
 */
const PopupWithForm: React.FunctionComponent<PopupWithFormProps> = ({
  title,
  name,
  submitButtonText,
  isOpen,
  onMouseDown,
  onClose,
  onSubmit,
  children,
  isValid,
}) => {
  /**
   * Параметр класса попапа.
   */
  const popupClassName = `popup ${isOpen && "popup_opened"}`;

  return (
    <div className={popupClassName} onMouseDown={onMouseDown}>
      <div className="popup__container">
        <button
          className="button popup__button_type_close"
          onClick={onClose}
          type="button"
          aria-label="Закрыть всплывающее окно"
        ></button>
        <h2 className="popup__title"> {title} </h2>
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
};

export default PopupWithForm;
