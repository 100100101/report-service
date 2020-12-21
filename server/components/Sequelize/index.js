const { Sequelize, DataTypes } = require('sequelize')
const getModels = require('./models')

module.exports = async () => {
  try {
    const sequelizeConnection = new Sequelize(
      process.env.USERS_CARS_DB_CREDENTIONS_URL,
      {
        logging: false,
      }
    )

    await sequelizeConnection.authenticate()
    console.log('Sequelize connection has been established successfully')

    const models = getModels(sequelizeConnection, DataTypes)
    if (!global.$appUtils.checkedIsObject(models)) {
      return
    }

    const sequelizeConnectionModels = sequelizeConnection.models
    if (!global.$appUtils.checkedIsObject(sequelizeConnectionModels)) {
      return
    }
    // init associates
    for (const model of Object.values(models)) {
      const modelAssociate = model.associate
      if (global.$appUtils.checkedIsFunction(modelAssociate)) {
        modelAssociate(sequelizeConnectionModels)
      }
    }

    await sequelizeConnection.sync({
      force: !!process.env.IS_UPDATE_FAKE_DATA,
    })

    return sequelizeConnection
  } catch (error) {
    console.error(error)
  }
}
