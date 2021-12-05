/* eslint-disable object-curly-newline */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SALT_ROUNDS, JWT_SECRET } = require('../config/index');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

// получение всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

// получение своего профиля (текущего залогиненного пользователя)
const getMyProfile = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя с таким id не существует.');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

// получение пользователя по id
function getUserById(req, res, next) {
  const { userId } = req.params;
  return User.findById(userId)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundError('Пользователя с таким id не существует.');
    })
    .catch(next);
}

// создание пользователя (регистрация)
const createUser = (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const { email, password, name, about, avatar } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Переданы некорректные данные.');
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с таким email уже существует.');
      }
      return bcrypt.hash(password, SALT_ROUNDS);
    })
    .then((hash) => User.create({ email, password: hash, name, about, avatar }))
    .then((userData) => res.status(201).send({ data: { email, id: userData._id } }))
    .catch(next);
};

// залогинивание пользователя
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).send({ token });
    })
    .catch(next);
};

// обновление профиля пользователя
const updateUserProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя с таким id не существует.');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

// обновление аватара пользователя
const updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;
  return User.findByIdAndUpdate(
    userId,
    { avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя с таким id не существует.');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

// экспорт контроллеров
module.exports = {
  getUsers,
  getMyProfile,
  getUserById,
  createUser,
  loginUser,
  updateUserProfile,
  updateUserAvatar,
};
