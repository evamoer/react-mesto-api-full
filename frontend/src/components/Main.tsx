import React from "react";
import Profile from "./Profile";
import Gallery from "./Gallery";

/**
 * Интерфейс для Main.
 * @prop onOpenPopup - обработчик данных, вводимых пользователем в форму, при логине.
 * @prop onImageCard - обработчик клика на изображение карточки.
 * @prop onCardLike - обработчик клика на кнопку лайка карточки.
 * @prop onCardDelete - обработчик клика на кнопку удаления карточки.
 */

interface MainProps {
  onOpenPopup: () => void;
  onImageCard: (values: { name: string; link: string }) => void;
  onCardLike: (likes: any[], _id: string) => void;
  onCardDelete: (_id: string) => void;
}

/**
 * Main - основной компонент App. Содержит в себе компоненты Profile и Gallery.
 */
const Main: React.FunctionComponent<MainProps> = ({
  onOpenPopup,
  onImageCard,
  onCardLike,
  onCardDelete,
}) => {
  return (
    <main className="content section page__content">
      <Profile onOpenPopup={onOpenPopup} />
      <Gallery
        onImageCard={onImageCard}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
      />
    </main>
  );
};

export default Main;
