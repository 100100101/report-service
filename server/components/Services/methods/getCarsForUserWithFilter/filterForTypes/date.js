const {
  filterTypeNames: { DATE_LATER, DATE_EARLIER },
} = global.$appConfig.filter
const dateToUtcMs = date => +new Date(new Date(date.toString()).toUTCString())

const checkFilterDateLaterCondition = (
  object,
  filteringPropName,
  filteringDate
) => dateToUtcMs(object[filteringPropName]) > filteringDate
const checkFilterDateEarlierCondition = (
  object,
  filteringPropName,
  filteringDate
) => dateToUtcMs(object[filteringPropName]) < filteringDate
module.exports = function(filterRules, objects, isObjectsMap) {
  for (const filterRule of filterRules) {
    const filteringPropName = filterRule.prop
    const filteringDate = dateToUtcMs(filterRule.value)
    if (!filteringDate) {
      return
    }
    switch (filterRule.type) {
      case DATE_LATER:
        if (isObjectsMap) {
          for (const object of objects.keys()) {
            if (
              !checkFilterDateLaterCondition(
                object,
                filteringPropName,
                filteringDate
              )
            ) {
              objects.delete(object)
            }
          }
        } else {
          objects = objects.filter(object => {
            return checkFilterDateLaterCondition(
              object,
              filteringPropName,
              filteringDate
            )
          })
        }
        break
      case DATE_EARLIER:
        if (isObjectsMap) {
          for (const object of objects.keys()) {
            if (
              !checkFilterDateEarlierCondition(
                object,
                filteringPropName,
                filteringDate
              )
            ) {
              objects.delete(object)
            }
          }
        } else {
          objects = objects.filter(object => {
            return checkFilterDateEarlierCondition(
              object,
              filteringPropName,
              filteringDate
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
