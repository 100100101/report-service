module.exports = (sequelize, DataTypes) => {
  const CarStatuses = sequelize.define(
    'carStatuses',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      mileage: {
        type: DataTypes.INTEGER,
      },
      speed: {
        type: DataTypes.SMALLINT,
      },
      direction: {
        type: DataTypes.SMALLINT,
      },
      address: {
        type: DataTypes.TEXT,
      },
      lastTransferDataDt: {
        type: DataTypes.DATE,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: false,
    }
  )

  CarStatuses.associate = models => {
    CarStatuses.belongsTo(models.cars, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    })
  }

  return CarStatuses
}
