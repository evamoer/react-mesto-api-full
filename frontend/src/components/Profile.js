import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Profile({ onEditProfile, onAddPlace, onEditAvatar }) {
  const { avatar, name, about } = useContext(CurrentUserContext);

  return (
    <section className="profile content__profile">
      <div className="profile__avatar-container" onClick={onEditAvatar}>
        <img src={avatar} alt="Аватар профиля" className="profile__avatar" />
      </div>
      <div className="profile__info">
        <h1 className="profile__name">{name}</h1>
        <button
          className="button button_type_edit-profile"
          onClick={onEditProfile}
          type="button"
          aria-label="Редактировать профиль"
        ></button>
        <p className="profile__about">{about}</p>
      </div>
      <button
        className="button button_type_add-place"
        onClick={onAddPlace}
        type="button"
        aria-label="Добавить место"
      ></button>
    </section>
  );
}
