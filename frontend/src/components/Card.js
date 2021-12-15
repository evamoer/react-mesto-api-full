import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  name,
  link,
  likes,
  owner,
  _id,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = owner === currentUser._id;
  const isLiked = likes.some((user) => user === currentUser._id);

  const handleClick = () => {
    onCardClick({ name: name, link: link });
  };

  const handleLikeClick = () => {
    onCardLike(likes, _id);
  };

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
        <div className="card__image-container" onClick={handleClick}>
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
}

export default Card;
