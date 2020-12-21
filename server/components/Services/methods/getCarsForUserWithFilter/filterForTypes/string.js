const replaceSpaceRegExp = / /gi
const checkFilterCondition = (
  object,
  filteringPropName,
  replaceSpaceRegExp,
  filteringValue
) => {
  return object[filteringPropName]
    .toString()
    .replace(replaceSpaceRegExp, '')
    .toLowerCase()
    .includes(filteringValue)
}
module.exports = function(filterRules, objects, isObjectsMap) {
  for (const filterRule of filterRules) {
    const filteringPropName = filterRule.prop
    const filteringValue = filterRule.value
      .replace(replaceSpaceRegExp, '')
      .toLowerCase()

    if (isObjectsMap) {
      for (const object of objects.keys()) {
        if (
          !checkFilterCondition(
            object,
            filteringPropName,
            replaceSpaceRegExp,
            filteringValue
          )
        ) {
          objects.delete(object)
        }
      }
    } else {
      objects = objects.filter(object => {
        return checkFilterCondition(
          object,
          filteringPropName,
          replaceSpaceRegExp,
          filteringValue
        )
      })
    }

    if (isObjectsMap ? !objects.size : !objects.length) {
      break
    }
  }
  return objects
}
