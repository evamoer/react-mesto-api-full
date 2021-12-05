import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

/**
 * Интерфейс для ImagePopup.
 * @prop onClose - функция закрытия попапа.
 * @prop onMouseDown - обработчик закрытия попапа по клику на оверлэй.
 */
interface ImagePopupProps {
  onClose: () => void;
  onMouseDown: (evt: React.MouseEvent) => void;
}

/**
 * ImagePopup - компонент попапа с полным изображением карточки.
 *
 * @prop onClose - функция закрытия попапа.
 */
const ImagePopup: React.FunctionComponent<ImagePopupProps> = ({
  onMouseDown,
  onClose,
}) => {
  /**
   * Параметр состояния попапа: true - открыт, false - закрыт.
   */
  const { imagePopupState } = useSelector((state: RootState) => state.popup);

  /**
   * Параметр состояния карточки.
   */
  const card = useSelector((state: RootState) => state.card);

  return (
    <div
      className={`popup popup_type_full-image ${
        card.name && card.link && imagePopupState && "popup_opened"
      }`}
      onMouseDown={onMouseDown}
    >
      <figure className="popup__container popup__container_type_full-image">
        <button
          className="button popup__button_type_close"
          onClick={onClose}
          type="button"
          aria-label="Закрыть всплывающее окно"
        ></button>
        <img src={card.link} alt={card.name} className="popup__full-image" />
        <figcaption className="popup__full-image-caption">
          {card.name}
        </figcaption>
      </figure>
    </div>
  );
};

export default ImagePopup;
