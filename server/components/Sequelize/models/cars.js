module.exports = (sequelize, DataTypes) => {
  const Cars = sequelize.define(
    'cars',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(20),
      },
      brand: {
        type: DataTypes.STRING(32),
      },
      contactPhoneNumber: {
        type: DataTypes.TEXT,
      },
      madeYear: {
        type: DataTypes.SMALLINT,
      },
      model: {
        type: DataTypes.STRING(32),
      },
      ownerFullName: {
        type: DataTypes.STRING(100),
      },
      purchaseDate: {
        type: DataTypes.DATEONLY,
      },
      registrationNumber: {
        type: DataTypes.STRING(10),
      },
    },
    {
      timestamps: true,
    }
  )

  Cars.associate = models => {
    Cars.belongsTo(models.users, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    })
    Cars.belongsTo(models.groups, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    })
    Cars.hasOne(models.carStatuses, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'cascade',
    })
  }

  return Cars
}
