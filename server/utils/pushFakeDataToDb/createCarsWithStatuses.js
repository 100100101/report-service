const { maxCarQuantityInGroup, maxIsQuality } = global.$appConfig.fakeDbData
module.exports = async (
  createCar,
  createCarStatus,
  groupsIdsWithAssociationsIds
) => {
  try {
    for (const groupsIdsWithAssociationsIdsEntry of Object.entries(
      groupsIdsWithAssociationsIds
    )) {
      const groupId = groupsIdsWithAssociationsIdsEntry[0]
      if (!groupId) {
        throw 'groupId is not defined'
      }
      const userId = groupsIdsWithAssociationsIdsEntry[1]?.userId
      if (!userId) {
        throw 'userId is not defined'
      }
      const maxCarQuantityInThisGroup = maxIsQuality
        ? maxCarQuantityInGroup
        : Math.floor(Math.random() * maxCarQuantityInGroup) + 1
      for (let i = 0; i < maxCarQuantityInThisGroup; i++) {
        const newCar = await createCar({
          userId,
          groupId,
        })
        if (!newCar) {
          throw 'Failed to create car'
        }
        console.log('Create car:', i)
        const newCarId = newCar.id
        if (!newCarId) {
          throw 'newCarId is not defined'
        }
        const newCarStatus = await createCarStatus({
          carId: newCarId,
        })
        if (!newCarStatus) {
          throw 'Failed to create carStatus'
        }
        console.log('Create carStatus:', i)
      }
    }
  } catch (error) {
    console.error(error)
  }
}
