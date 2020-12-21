const {
  filterTypeNames: { VALUE_MORE, VALUE_LESS, VALUE_IS },
} = global.$appConfig.filter
const checkFilterValueMoreCondition = (
  object,
  filteringPropName,
  filteringValue
) => object[filteringPropName] > filteringValue
const checkFilterValueLessCondition = (
  object,
  filteringPropName,
  filteringValue
) => object[filteringPropName] < filteringValue
const checkFilterValueIsCondition = (
  object,
  filteringPropName,
  filteringValue
) => object[filteringPropName] === filteringValue
module.exports = function(filterRules, objects, isObjectsMap) {
  for (const filterRule of filterRules) {
    const filteringPropName = filterRule.prop
    const filteringValue = parseInt(filterRule.value, 10)
    if (!filteringValue && filteringValue !== 0) {
      continue
    }

    switch (filterRule.type) {
      case VALUE_MORE:
        if (isObjectsMap) {
          for (const object of objects.keys()) {
            if (
              !checkFilterValueMoreCondition(
                object,
                filteringPropName,
                filteringValue
              )
            ) {
              objects.delete(object)
            }
          }
        } else {
          objects = objects.filter(object => {
            return checkFilterValueMoreCondition(
              object,
              filteringPropName,
              filteringValue
            )
          })
        }
        break
      case VALUE_LESS:
        if (isObjectsMap) {
          for (const object of objects.keys()) {
            if (
              !checkFilterValueLessCondition(
                object,
                filteringPropName,
                filteringValue
              )
            ) {
              objects.delete(object)
            }
          }
        } else {
          objects = objects.filter(object => {
            return checkFilterValueLessCondition(
              object,
              filteringPropName,
              filteringValue
            )
          })
        }

        break
      case VALUE_IS:
        if (isObjectsMap) {
          for (const object of objects.keys()) {
            if (
              !checkFilterValueIsCondition(
                object,
                filteringPropName,
                filteringValue
              )
            ) {
              objects.delete(object)
            }
          }
        } else {
          objects = objects.filter(object => {
            return checkFilterValueIsCondition(
              object,
              filteringPropName,
              filteringValue
            )
          })
        }
    }

    if (isObjectsMap ? !objects.size : !objects.length) {
      break
    }
  }
  return objects
}
