module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define(
    'groups',
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
    },
    {
      timestamps: true,
    }
  )

  Groups.associate = models => {
    Groups.hasMany(models.cars, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'cascade',
    })
    Groups.belongsTo(models.users, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    })
  }

  return Groups
}
