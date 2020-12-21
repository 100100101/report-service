module.exports = (Cars, faker) => async (props = {}) => {
  try {
    return Cars.create(
      Object.assign(
        {},
        {
          name: faker.random.words().slice(0, 20),
          brand: faker.vehicle.manufacturer(),
          contactPhoneNumber: faker.phone.phoneNumber(),
          madeYear: 2000 + Math.floor(Math.random() * 20),
          model: faker.vehicle.model(),
          ownerFullName: faker.name.findName(),
          purchaseDate: faker.date.past(),
          registrationNumber: faker.vehicle.vin().slice(0, 10),
        },
        props
      )
    )
  } catch (error) {
    console.error(error)
  }
}
