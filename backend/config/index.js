const SALT_ROUNDS = 10;
// eslint-disable-next-line no-useless-escape
const URL_REG_EXP = /https?:\/\/(www\.)?[\w-]*\.[\w\-._~:\/?#[\]@!$&'()*+,;=]*#?/;

module.exports = { SALT_ROUNDS, URL_REG_EXP };
