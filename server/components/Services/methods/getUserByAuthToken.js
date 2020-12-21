const jwt = require('jsonwebtoken')
const SECRET_KEY_FOR_ENCRYPT = process.env.SECRET_KEY_FOR_ENCRYPT
if (!SECRET_KEY_FOR_ENCRYPT) {
  throw new Error('SECRET_KEY_FOR_ENCRYPT is not defined')
}
module.exports = async function(authToken) {
  try {
    const decodedAuthToken = jwt.verify(authToken, SECRET_KEY_FOR_ENCRYPT)
    if (!decodedAuthToken) {
      return
    }
    const userId = decodedAuthToken.id
    if (!userId) {
      return
    }
    const usersModel = this?.sequelize?.models?.users
    if (!usersModel) {
      return
    }
    const user = await usersModel.findByPk(userId)
    if (!user) {
      return
    }
    return user
  } catch (error) {
    console.error(error)
  }
}
