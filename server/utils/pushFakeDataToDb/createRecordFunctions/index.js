const faker = require('faker')
faker.locale = 'ru'
const createUser = require('./createUser')
const createGroup = require('./createGroup')
const createCar = require('./createCar')
const createCarStatus = require('./createCarStatus')
module.exports = sequelizeInstance => {
  try {
    const sequelizeModels = sequelizeInstance?.models
    if (!global.$appUtils.checkedIsObject(sequelizeModels)) {
      return
    }
    const {
      users: Users,
      groups: Groups,
      cars: Cars,
      carStatuses: CarStatuses,
    } = sequelizeModels

    if (
      !global.$appUtils.checkedIsFunction(Users) ||
      !global.$appUtils.checkedIsFunction(Groups) ||
      !global.$appUtils.checkedIsFunction(Cars) ||
      !global.$appUtils.checkedIsFunction(CarStatuses)
    ) {
      console.error('Model is not an object')
      return
    }

    return {
      createUser: createUser(Users, faker),
      createGroup: createGroup(Groups, faker),
      createCar: createCar(Cars, faker),
      createCarStatus: createCarStatus(CarStatuses, faker),
    }
  } catch (error) {
    console.error(error)
  }
}
