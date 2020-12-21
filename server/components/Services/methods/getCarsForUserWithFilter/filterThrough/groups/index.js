const getRequiredGroupIds = require('./getRequiredGroupIds')
const filterForTypes = require('../../filterForTypes')
module.exports = async function(groupedFilterRules, user) {
  try {
    const filterByIdRules = groupedFilterRules?.id
    if (!Array.isArray(filterByIdRules) || !user) {
      return
    }
    const inGroupsRules = []
    const notGroupsRules = []
    for (const filterRule of filterByIdRules) {
      switch (filterRule.type) {
        case 'inGroups':
          inGroupsRules.push(filterRule)
          break
        case 'notGroups':
          notGroupsRules.push(filterRule)
      }
    }

    const requiredGroupIds = await getRequiredGroupIds(
      inGroupsRules,
      notGroupsRules,
      user
    )

    if (!Array.isArray(requiredGroupIds)) {
      return
    }

    let requiredGroupModels = []

    for (const requiredGroupId of requiredGroupIds) {
      const groupsModels = await user.getGroups({
        where: {
          id: requiredGroupId,
        },
      })
      if (!Array.isArray(groupsModels)) {
        return
      }
      const groupsModel = groupsModels[0]
      if (!groupsModel) {
        return
      }
      requiredGroupModels.push(groupsModel)
    }

    const userCars = []

    if (!requiredGroupModels.length) {
      return userCars
    }

    requiredGroupModels = filterForTypes(
      groupedFilterRules,
      requiredGroupModels
    )

    if (!Array.isArray(requiredGroupModels)) {
      return
    } else if (!requiredGroupModels.length) {
      return userCars
    }

    for (const group of requiredGroupModels) {
      const carsOfGroup = await group.getCars()
      if (!carsOfGroup) {
        return
      } else if (Array.isArray(carsOfGroup)) {
        for (const carOfGroup of carsOfGroup) {
          carOfGroup.group = group
          userCars.push(carOfGroup)
        }
      }
    }

    return userCars
  } catch (error) {
    console.error(error)
  }
}
