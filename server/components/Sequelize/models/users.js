module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING(100),
      },
      login: {
        type: DataTypes.STRING(64),
        unique: true,
      },
      password: {
        type: DataTypes.STRING(64),
      },
    },
    {
      timestamps: true,
    }
  )

  Users.associate = models => {
    Users.hasMany(models.cars, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    })
    Users.hasMany(models.groups, {
      onDelete: 'cascade',
      foreignKey: {
        allowNull: false,
      },
    })
  }

  return Users
}
