const filter = require('./filter')
const httpsApi = require('./httpsApi')
const getOptionsForClient = require('./getOptionsForClient')
class Configs {
  constructor() {
    this.httpsApi = httpsApi
    this.filter = filter

    this.fakeDbData = {
      userQuantity: 2,
      maxGroupQuantityOfUser: 10,
      maxCarQuantityInGroup: 1000,
      maxIsQuality: true,
    }

    this.saltRounds = 10

    this.forClient = this.getOptionsForClient()

    if (!this.forClient) {
      return new Error('Initialized with an error')
    }
  }
}
Configs.prototype.getOptionsForClient = getOptionsForClient
module.exports = Configs
