import React from "react";
import Card from "./Card";

export default function Gallery({
  onImageCard,
  cards,
  onCardLike,
  onCardDelete,
}) {
  return (
    <section className="gallery content__gallery">
      <ul className="gallery-table">
        {cards.map((card) => (
          <Card
            key={card._id}
            name={card.name}
            link={card.link}
            likes={card.likes}
            owner={card.owner}
            _id={card._id}
            onCardClick={onImageCard}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </section>
  );
}
