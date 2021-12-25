/* 获取一个期限为4小时的token */
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/jwt')

//playload = user._id
function buildToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn:'7d' });
}

function verify(token){
  return jwt.verify(token.split(' ')[1],SECRET).id;
}

module.exports = {
  buildToken,
  verify,
}
