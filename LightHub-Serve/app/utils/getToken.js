/* 获取一个期限为4小时的token */
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/jwt')

function getToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '4h' });
}

function verify(token){
  return jwt.verify(token,SECRET);
}

module.exports = {
  getToken,
  verify,
}
