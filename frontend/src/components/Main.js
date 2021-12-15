import React from "react";
import Profile from "./Profile";
import Gallery from "./Gallery";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onImageCard,
  cards,
  onCardLike,
  onCardDelete,
}) {
  return (
    <main className="content section page__content">
      <Profile
        onEditProfile={onEditProfile}
        onAddPlace={onAddPlace}
        onEditAvatar={onEditAvatar}
      />
      <Gallery
        onImageCard={onImageCard}
        cards={cards}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    </main>
  );
}
