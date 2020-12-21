module.exports = async function(inGroupsRules, notGroupsRules, user) {
  try {
    let requiredGroupIds = []

    if (inGroupsRules.length) {
      requiredGroupIds = [
        ...new Set(
          inGroupsRules.reduce(
            (accumulator, inGroupsRule) => accumulator.concat(inGroupsRule.ids),
            []
          )
        ),
      ]
    }
    if (!requiredGroupIds.length) {
      const userGroupsModels = await user.getGroups()
      if (!Array.isArray(userGroupsModels)) {
        throw 'userGroupsModels is not array'
      }
      requiredGroupIds = userGroupsModels.map(
        userGroupsModel => userGroupsModel.id
      )
    }

    if (notGroupsRules.length) {
      const notGroupsIds = [
        ...new Set(
          notGroupsRules.reduce(
            (accumulator, inGroupsRule) => accumulator.concat(inGroupsRule.ids),
            []
          )
        ),
      ]
      requiredGroupIds = requiredGroupIds.filter(requiredGroupId => {
        return !notGroupsIds.includes(requiredGroupId)
      })
    }

    return requiredGroupIds
  } catch (error) {
    console.error(error)
  }
}
