const filterForTypes = require('../filterForTypes')
const os = require('os')
const cpuCount = os.cpus().length
module.exports = async function(groupedFilterRules, cars) {
  const allCarsStatusesMap = new Map()
  // console.time('time')
  // console.timeLog('time')
  // for (const car of cars) {
  //   if(global.$appUtils.checkedIsFunction(car.getCarStatus)) {
  //     return
  //   }
  //   const carStatuses = await car.getCarStatus()
  //   if (!Array.isArray(carStatuses)) {
  //     return
  //   } else if (carStatuses.length) {
  //     for (const carStatus of carStatuses) {
  //       allCarsStatusesMap.set(carStatus, car)
  //     }
  //   }
  // }
  // console.timeEnd('time')

  // console.time('time')
  // console.timeLog('time')
  let promisesPart = []
  const carsLength = cars.length
  for (const car of cars) {
    if (!global.$appUtils.checkedIsFunction(car.getCarStatus)) {
      return
    }
    promisesPart.push(
      car.getCarStatus().then(carStatus => {
        if (!global.$appUtils.checkedIsObject(carStatus)) {
          return
        }
        allCarsStatusesMap.set(carStatus, car)
      })
    )
    if (
      promisesPart.length === cpuCount ||
      cars.indexOf(car) === carsLength - 1
    ) {
      await Promise.all(promisesPart)
      promisesPart = []
    }
  }
  // console.timeEnd('time')

  const filteredCarStatusesMap = filterForTypes(
    groupedFilterRules,
    allCarsStatusesMap,
    true
  )

  if (!(filteredCarStatusesMap instanceof Map)) {
    return
  } else if (!filteredCarStatusesMap.size) {
    return []
  }

  const carsByFilteredCarStatuses = []
  for (const filteredCarStatusEntry of filteredCarStatusesMap.entries()) {
    const carStatus = filteredCarStatusEntry[0]
    const car = filteredCarStatusEntry[1]
    if (!carsByFilteredCarStatuses.includes(car)) {
      car.car = car
      car.carStatus = carStatus
      carsByFilteredCarStatuses.push(car)
    }
  }

  return carsByFilteredCarStatuses
}
