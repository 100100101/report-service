const filterForNumber = require('./number')
const filterForString = require('./string')
const filterForDate = require('./date')
module.exports = function(filterRulesOfTypes, objects, isObjectsMap) {
  /*TODO {key: '', value: function}*/
  const filterMiddlewares = [
    ['number', filterForNumber],
    ['string', filterForString],
    ['date', filterForDate],
  ]

  for (const filterMiddleware of filterMiddlewares) {
    if (isObjectsMap ? !objects.size : !objects.length) {
      continue
    }
    const filterRulesOfType = filterRulesOfTypes[filterMiddleware[0]]
    if (!Array.isArray(filterRulesOfType) || !filterRulesOfType.length) {
      continue
    }
    objects = filterMiddleware[1](filterRulesOfType, objects, isObjectsMap)
    if (isObjectsMap ? !(objects instanceof Map) : !Array.isArray(objects)) {
      return
    }
  }
  return objects
}
