const SALT_ROUNDS = 10;
const JWT_SECRET = 'super-secret-key';
// eslint-disable-next-line no-useless-escape
const URL_REG_EXP = /https?:\/\/(www\.)?[\w-]*\.[\w\-._~:\/?#[\]@!$&'()*+,;=]*#?/;

module.exports = { SALT_ROUNDS, JWT_SECRET, URL_REG_EXP };
