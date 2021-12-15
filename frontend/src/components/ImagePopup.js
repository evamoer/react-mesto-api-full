export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_type_full-image ${
        card && isOpen && "popup_opened"
      }`}
      onMouseDown={onClose}
    >
      <figure className="popup__container popup__container_type_full-image">
        <button
          className="button popup__button_type_close"
          onClick={onClose}
          type="button"
          aria-label="Закрыть всплывающее окно"
        ></button>
        <img
          src={card && card.link}
          alt={card && card.name}
          className="popup__full-image"
        />
        <figcaption className="popup__full-image-caption">
          {card && card.name}
        </figcaption>
      </figure>
    </div>
  );
}
