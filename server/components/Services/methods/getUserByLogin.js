module.exports = async function(login) {
  try {
    const usersModel = this?.sequelize?.models?.users
    if (!usersModel) {
      return
    }
    const user = await usersModel.findOne({ where: { login } })
    if (!user) {
      return
    }
    return user
  } catch (error) {
    console.error(error)
  }
}
