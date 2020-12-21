const getDefinedUserThroughCtx = require('./methods/getDefinedUserThroughCtx')
const getAllGroupsDataOfUser = require('./methods/getAllGroupsDataOfUser')
const getCarsForUserWithFilter = require('./methods/getCarsForUserWithFilter')
const filterOptionsValidate = require('./methods/filterOptionsValidate')
const getUserByAuthToken = require('./methods/getUserByAuthToken')
const getUserByLogin = require('./methods/getUserByLogin')
const getUserByLoginPassword = require('./methods/getUserByLoginPassword')
class Services {
  constructor(sequelize) {
    this.sequelize = sequelize
  }
}
Services.prototype.getDefinedUserThroughCtx = getDefinedUserThroughCtx
Services.prototype.getAllGroupsDataOfUser = getAllGroupsDataOfUser
Services.prototype.getCarsForUserWithFilter = getCarsForUserWithFilter
Services.prototype.filterOptionsValidate = filterOptionsValidate
Services.prototype.getUserByAuthToken = getUserByAuthToken
Services.prototype.getUserByLogin = getUserByLogin
Services.prototype.getUserByLoginPassword = getUserByLoginPassword

module.exports = Services
