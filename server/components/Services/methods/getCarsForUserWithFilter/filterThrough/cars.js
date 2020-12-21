const filterForTypes = require('../filterForTypes')
module.exports = async function(groupedFilterRules, cars) {
  cars = filterForTypes(groupedFilterRules, cars)
  return cars
}
