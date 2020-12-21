require('dotenv').config()
const AppConfig = require('./configs')
const UtilsConfig = require('./utils/appUtils')
const appConfig = new AppConfig()
if (appConfig instanceof Error) {
  throw appConfig
}
global.$appConfig = appConfig
const appUtils = new UtilsConfig()

if (appUtils instanceof Error) {
  throw appUtils
}
global.$appUtils = appUtils

const getSequelizeInstance = require('./components/Sequelize')
const Services = require('./components/Services')
const HttpsApi = require('./components/HttpsApi')
const pushFakeDataToDb = require('./utils/pushFakeDataToDb')

class App {
  constructor() {
    this.init()
    global.app = this
  }

  async init() {
    try {
      this.sequelize = await getSequelizeInstance()
      if (!global.$appUtils.checkedIsObject(this.sequelize)) {
        return
      }
      if (process.env.IS_UPDATE_FAKE_DATA) {
        const pushFakeDataToDbResult = await pushFakeDataToDb(this.sequelize)
        if (!pushFakeDataToDbResult) {
          throw 'Failed to populate the database with fake data'
        }
      }
      this.services = new Services(this.sequelize)
      if (!this.services) {
        throw 'services is not defined'
      }
      this.httpsApi = new HttpsApi(this.services)
      if (!this.httpsApi) {
        throw 'httpsApi is not defined'
      }
    } catch (error) {
      console.error(error)
    }
  }
}

new App()
