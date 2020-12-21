const maxMileage = 1000000
const maxSpeed = 250
module.exports = (CarStatuses, faker) => async (props = {}) => {
  try {
    return CarStatuses.create(
      Object.assign(
        {},
        {
          mileage: Math.floor(maxMileage * Math.random()),
          speed: Math.random() > 0.5 ? Math.floor(maxSpeed * Math.random()) : 0,
          direction: Math.floor(360 * Math.random()),
          address: `${faker.address.city()} ${faker.address.streetAddress()}`,
          lastTransferDataDt: faker.date.past(),
          active: Math.random() > 0.5,
        },
        props
      )
    )
  } catch (error) {
    console.error(error)
  }
}
