module.exports = function() {
  return {
    path: '/getFilteredObjects',
    async handler(ctx) {
      try {
        const filterOptions = ctx.request.body

        if (!filterOptions) {
          ctx.status = 500
          return
        }
        const services = this.services
        if (!services) {
          ctx.status = 500
          return
        }
        const user = await services?.getDefinedUserThroughCtx(ctx)

        if (!user) {
          ctx.status = 500
          return
        }

        const validatedFilterOptions = await services?.filterOptionsValidate(
          filterOptions
        )

        if (!validatedFilterOptions) {
          ctx.status = 500
          return
        }

        const filteredCars = await this.services
          .getCarsForUserWithFilter(user, validatedFilterOptions)
          .catch(error => {
            console.error(error)
          })

        if (!filteredCars) {
          ctx.status = 500
          return
        }

        ctx.body = filteredCars
      } catch (error) {
        ctx.status = 500
        console.error(error)
      }
    },
  }
}
