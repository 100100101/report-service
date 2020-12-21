module.exports = (Groups, faker) => async (props = {}) => {
  try {
    return Groups.create(
      Object.assign(
        {},
        {
          name: faker.git.branch().slice(0, 20),
        },
        props
      )
    )
  } catch (error) {
    console.error(error)
  }
}
