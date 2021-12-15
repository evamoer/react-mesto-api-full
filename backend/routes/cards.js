const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { validateURL } = require('../helpers/validateURL');
const {
  getCards,
  createCard,
  deleteCardById,
  addCardLike,
  removeCardLike,
} = require('../controllers/cards');

router.get('/', getCards);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL, 'custom URL validation'),
    }),
  }),
  createCard,
);

router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  deleteCardById,
);
router.put(
  '/likes/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  addCardLike,
);
router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }),
  removeCardLike,
);

module.exports = router;
