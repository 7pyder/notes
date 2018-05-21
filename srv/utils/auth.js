const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
  const cookie = req.cookies
  if (cookie && cookie.jwt) {
    const payload = jwt.verify(cookie.jwt, 'secret')
    if (payload) {
      req.userId = payload.id
    }
  }

  if (!req.userId) {
    return res.sendStatus(401)
  }
  next()
}

module.exports = {
  verify
}
