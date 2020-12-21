const filterThroughGroups = require('./filterThrough/groups')
const filterThroughCars = require('./filterThrough/cars')
const filterThroughCarStatuses = require('./filterThrough/carStatuses')
const createReportWithSchema = require('./createReportWithSchema')
const filterRulesConstructor = global.$appConfig.filter
const filterTypesByKey = filterRulesConstructor.filterTypesByKey

module.exports = async function(user, filterOptions) {
  const filterRulesThrough = {
    group: {
      id: [],
      string: [],
    },
    car: {
      number: [],
      string: [],
      date: [],
    },
    carStatus: {
      number: [],
      string: [],
      date: [],
    },
  }
  let requiredFieldsForReport = []

  for (const filterRule of filterOptions.filterRules) {
    const filterRuleFieldPath = filterRule.field
    if (!filterRuleFieldPath) {
      if (filterRule.ids) {
        filterRulesThrough.group.id.push(filterRule)
      }
      continue
    }
    let filterType = ''
    switch (filterTypesByKey[filterRule.type].type) {
      case 'number':
        filterType = 'number'
        break
      case 'string':
        filterType = 'string'
        break
      case 'date':
        filterType = 'date'
        break
    }
    if (!requiredFieldsForReport.includes(filterRuleFieldPath)) {
      requiredFieldsForReport.push(filterRuleFieldPath)
    }
    const filterRuleFieldPathSplit = filterRuleFieldPath.split('.')
    filterRule.prop = filterRuleFieldPathSplit[1]
    filterRulesThrough[filterRuleFieldPathSplit[0]][filterType].push(filterRule)
  }

  const filterMiddlewares = [
    [filterThroughGroups, filterRulesThrough.group, user],
    [filterThroughCars, filterRulesThrough.car],
    [filterThroughCarStatuses, filterRulesThrough.carStatus],
  ]

  let filteredObjects = null
  for (const filterMiddleware of filterMiddlewares) {
    filteredObjects = await filterMiddleware[0].call(
      this,
      ...filterMiddleware.slice(1),
      filteredObjects
    )
    if (!Array.isArray(filteredObjects)) {
      return
    } else if (!filteredObjects.length) {
      break
    }
  }

  requiredFieldsForReport = [
    ...new Set([
      'car.name',
      ...requiredFieldsForReport,
      ...filterOptions.additionalFields,
    ]),
  ]

  const report = createReportWithSchema(
    filteredObjects,
    requiredFieldsForReport
  )

  if (!report) {
    return
  }

  return report
}
