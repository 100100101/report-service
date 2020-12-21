const bcrypt = require('bcrypt')
const saltRounds = global.$appConfig.saltRounds
if (!saltRounds) {
  throw 'saltRounds is not defined'
}
module.exports = (Users, faker) => async (props = {}) => {
  try {
    const login = faker.internet.userName()
    // const password = faker.internet.password()
    const password = login + '123456'
    const passwordHash = await bcrypt.hash(password, saltRounds)
    return Users.create(
      Object.assign(
        {},
        {
          fullname: faker.name.findName(),
          login,
          password: passwordHash,
        },
        props
      )
    )
  } catch (error) {}
}
