const bcrypt = require('bcrypt')
const checkedIsObject = global.$appUtils.checkedIsObject
module.exports = async function(login, password) {
  try {
    const userByLogin = await this?.getUserByLogin(login)
    if (!checkedIsObject(userByLogin)) {
      return
    }
    const userByLoginPassword = userByLogin.password
    if (!userByLoginPassword) {
      return
    }
    const isPasswordsMatch = await bcrypt.compare(password, userByLoginPassword)
    if (!isPasswordsMatch) {
      return
    }
    return userByLogin
  } catch (error) {
    console.error(error)
  }
}
