import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

/**
 * Интерфейс для Card.
 * @prop name - название карточки.
 * @prop link - ссылка на изображение карточки.
 * @prop likes - массив пользователей, лайкнувших карточку.
 * @prop owner - массив данных пользователя, загрузившего карточку.
 * @prop _id - id карточки.
 * @prop onCardClick - обработчик клика на изображение карточки.
 * @prop onCardLike - обработчик клика на кнопку лайка карточки.
 * @prop onCardDelete - обработчик клика на кнопку удаления карточки.
 */

interface CardProps {
  name: string;
  link: string;
  likes: any[];
  owner: {
    name: string;
    about: string;
    avatar?: string;
    _id: string;
  };
  _id: string;
  onCardClick: (values: { name: string; link: string }) => void;
  onCardLike: (likes: any[], _id: string) => void;
  onCardDelete: (_id: string) => void;
}

/**
 * Card - компонент карточки в галерее.
 */
const Card: React.FunctionComponent<CardProps> = ({
  name,
  link,
  likes,
  owner,
  _id,
  onCardClick,
  onCardLike,
  onCardDelete,
}) => {
  /**
   * Параметры текущего пользователя.
   */
  const currentUser = useSelector((state: RootState) => state.user);

  /**
   * Параметр, определяющий, является ли пользователь создателем карточки.
   * Необходим для отрисовки нопки удаления карточки.
   */
  const isOwn = owner._id === currentUser._id;

  /**
   * Параметр, определяющий, лайкнул ли пользователь карточку.
   * Необходим для отображения активного лайка карточки.
   */
  const isLiked = likes.some((user) => user._id === currentUser._id);

  /**
   * Обработчик клика на изображение карточки.
   */
  const handleCardClick = () => {
    onCardClick({ name: name, link: link });
  };

  /**
   * Обработчик клика на кнопку лайка карточки.
   */
  const handleLikeClick = () => {
    onCardLike(likes, _id);
  };

  /**
   * Обработчик клика на кнопку удаления карточки.
   */
  const handleDeleteClick = () => {
    onCardDelete(_id);
  };

  return (
    <li className="gallery-table__item">
      {isOwn && (
        <button
          className={"button card__delete-button"}
          onClick={handleDeleteClick}
        ></button>
      )}
      <article className="card">
        <div className="card__image-container" onClick={handleCardClick}>
          <img src={link} alt={name} className="card__image" />
        </div>
        <div className="card__info">
          <h2 className="card__title">{name}</h2>
          <div className="card__like-area">
            <button
              className={`button card__like-button ${
                isLiked && "card__like-button_active"
              }`}
              onClick={handleLikeClick}
              type="button"
              aria-label="Поставить лайк"
            ></button>
            <span className="card__like-number">{likes.length}</span>
          </div>
        </div>
      </article>
    </li>
  );
};

export default Card;
