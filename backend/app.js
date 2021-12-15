const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const routes = require('./routes/index');
const { loginUser, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateURL } = require('./helpers/validateURL');
const errorsHandler = require('./middlewares/errors-handler');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateURL, 'custom URL validator'),
    }),
  }),
  createUser,
);
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  loginUser,
);

app.use(auth);
app.use(routes);

app.use(errorLogger);
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use('/', (req, res, next) => {
  throw new NotFoundError('Такая страница отсутствует. ');
});

app.use(errorsHandler);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log('Server is running on PORT:', PORT);
});
