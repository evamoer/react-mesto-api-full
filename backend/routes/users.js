const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { validateURL } = require('../helpers/validateURL');
const { getUsers, getMyProfile, getUserById, updateUserProfile, updateUserAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMyProfile);
router.get('/:userId', celebrate({ params: Joi.object().keys({ userId: Joi.string().length(24).hex() }) }), getUserById);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUserProfile,
);
router.patch('/me/avatar', celebrate({ body: Joi.object().keys({ avatar: Joi.string().required().custom(validateURL, 'custom URL validation') }) }), updateUserAvatar);

module.exports = router;
