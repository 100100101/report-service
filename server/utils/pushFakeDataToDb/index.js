const createRecordFunctions = require('./createRecordFunctions')
const createUsers = require('./createUsers')
const createGroups = require('./createGroups')
const createCarsWithStatuses = require('./createCarsWithStatuses')

module.exports = async sequelizeInstance => {
  try {
    const {
      createUser,
      createGroup,
      createCar,
      createCarStatus,
    } = createRecordFunctions(sequelizeInstance)

    const usersIds = await createUsers(createUser)
    if (!Array.isArray(usersIds)) {
      throw 'usersIds is not array'
    }
    const groupsIdsWithAssociationsIds = await createGroups(
      createGroup,
      usersIds
    )

    if (!global.$appUtils.checkedIsObject(groupsIdsWithAssociationsIds)) {
      throw 'groupsIdsWithAssociationsIds is not object'
    }

    const isCreatedCarsWithStatuses = await createCarsWithStatuses(
      createCar,
      createCarStatus,
      groupsIdsWithAssociationsIds
    )

    return !!isCreatedCarsWithStatuses
  } catch (error) {
    console.error(error)
  }
}
