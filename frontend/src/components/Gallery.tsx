import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Card from "./Card";

/**
 * Интерфейс для Gallery.
 * @prop onImageCard - обработчик клика на изображение карточки.
 * @prop onCardLike - обработчик клика на кнопку лайка карточки.
 * @prop onCardDelete - обработчик клика на кнопку удаления карточки.
 */

interface GalleryProps {
  onImageCard: (values: { name: string; link: string }) => void;
  onCardLike: (likes: any[], _id: string) => void;
  onCardDelete: (_id: string) => void;
}

/**
 * Gallery - компонент галереи.
 */
const Gallery: React.FunctionComponent<GalleryProps> = ({
  onImageCard,
  onCardLike,
  onCardDelete,
}) => {
  /**
   * Параметр карточек галереи.
   */
  const cards = useSelector((state: RootState) => state.cards);

  return (
    <section className="gallery content__gallery">
      <ul className="gallery-table">
        {cards.map(({ _id, name, link, likes, owner }) => (
          <Card
            key={_id}
            name={name}
            link={link}
            likes={likes}
            owner={owner}
            _id={_id}
            onCardClick={onImageCard}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </section>
  );
};

export default Gallery;
