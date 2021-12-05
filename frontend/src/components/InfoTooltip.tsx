import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

/**
 * Интерфейс для InfoTooltip.
 * @prop onClose - функция закрытия попапа.
 * @prop onMouseDown - обработчик закрытия попапа по клику на оверлэй.
 */
interface InfoTooltipProps {
  onMouseDown: (evt: React.MouseEvent) => void;
  onClose: () => void;
}

/**
 * InfoTooltip - компонент попапа с формой добавления карточки в галерею.
 */
const InfoTooltip: React.FunctionComponent<InfoTooltipProps> = ({
  onMouseDown,
  onClose,
}) => {
  /**
   * Параметр состояния попапа: true - открыт, false - закрыт.
   */
  const { infoTooltipState } = useSelector((state: RootState) => state.popup);

  /**
   * Параметр состояния регистрации пользователя.
   */
  const { isRegistered } = useSelector((state: RootState) => state.auth);

  /**
   * Параметр класса попапа.
   */
  const popupClassName = `popup ${infoTooltipState && "popup_opened"}`;

  const title = isRegistered
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";

  const signClassName = `popup__info-sign ${
    isRegistered
      ? "popup__info-sign_type_success"
      : "popup__info-sign_type_fail"
  }`;

  return (
    <div className={popupClassName} onMouseDown={onMouseDown}>
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
};

export default InfoTooltip;
