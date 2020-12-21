const jwt = require('jsonwebtoken')
const SECRET_KEY_FOR_ENCRYPT = process.env.SECRET_KEY_FOR_ENCRYPT
if (!SECRET_KEY_FOR_ENCRYPT) {
  throw new Error('SECRET_KEY_FOR_ENCRYPT is not defined')
}
module.exports = function(ctx, user) {
  try {
    const userId = user.id
    if (!userId) {
      return
    }
    const token = jwt.sign({ id: userId }, SECRET_KEY_FOR_ENCRYPT)
    if (!token) {
      return
    }
    ctx.cookies.set('authToken', token, {
      httpOnly: true,
      secure: true,
    })
    return true
  } catch (error) {
    console.error(error)
  }
}
