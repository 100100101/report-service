const users = require('./users')
const cars = require('./cars')
const groups = require('./groups')
const carStatuses = require('./carStatuses')

module.exports = (sequelize, DataTypes) => {
  return {
    users: users(sequelize, DataTypes),
    cars: cars(sequelize, DataTypes),
    groups: groups(sequelize, DataTypes),
    carStatuses: carStatuses(sequelize, DataTypes),
  }
}
