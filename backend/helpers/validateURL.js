const isURL = require('validator/lib/isURL');

const validateURL = (value) => {
  if (!isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

module.exports = {
  validateURL,
};
