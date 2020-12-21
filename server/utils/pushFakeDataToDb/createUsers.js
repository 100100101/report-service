const { userQuantity } = global.$appConfig.fakeDbData

module.exports = async createUser => {
  try {
    const usersIds = []
    for (let i = 0; i < userQuantity; i++) {
      const newUser = await createUser()
      if (newUser) {
        const newUserId = newUser.id
        if (!newUserId) {
          throw 'newUserId is not defined'
        }
        usersIds.push(newUserId)
      } else {
        throw 'Failed to create user'
      }
      console.log('Create user:', i)
    }
    return usersIds
  } catch (error) {
    console.error(error)
  }
}
