const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const newCard = { ...req.body, owner };
  Card.create(newCard)
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => new NotFoundError('Карточки с таким id не существует.'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нельзя удалить чужую карточку.'));
      }
      return card.remove().then(() => res.send({ message: 'Карточка удалена.' }));
    })
    .catch(next);
};

const addCardLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  return Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      throw new NotFoundError('Карточки с таким id не существует.');
    })
    .catch(next);
};

const removeCardLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  return Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      throw new NotFoundError('Карточки с таким id не существует.');
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  addCardLike,
  removeCardLike,
};
