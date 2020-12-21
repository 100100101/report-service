module.exports = async function(user) {
  try {
    if (!user) {
      return
    }
    if (!global.$appUtils.checkedIsFunction(user.getGroups)) {
      console.error('user.getGroups is not a function')
      return
    }
    return await user.getGroups()
  } catch (error) {
    console.error(error)
  }
}
