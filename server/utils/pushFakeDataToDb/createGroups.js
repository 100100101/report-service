const { maxGroupQuantityOfUser, maxIsQuality } = global.$appConfig.fakeDbData
module.exports = async (createGroup, usersIds) => {
  try {
    const groupsIdsWithAssociationsIds = {}
    for (const userId of usersIds) {
      const maxGroupQuantityOfThisUser = maxIsQuality
        ? maxGroupQuantityOfUser
        : Math.floor(Math.random() * maxGroupQuantityOfUser) + 1
      for (let i = 0; i < maxGroupQuantityOfThisUser; i++) {
        const newGroup = await createGroup({
          userId,
        })
        if (!newGroup) {
          throw 'Failed to create group'
        }
        const newGroupId = newGroup.id
        if (!newGroupId) {
          throw 'newGroupId is not defined'
        }
        let associationsIds = groupsIdsWithAssociationsIds[newGroupId]
        if (!associationsIds) {
          associationsIds = {}
          groupsIdsWithAssociationsIds[newGroupId] = associationsIds
        }
        associationsIds.userId = userId
        console.log('Create group:', i)
      }
    }
    return groupsIdsWithAssociationsIds
  } catch (error) {
    console.error(error)
  }
}
