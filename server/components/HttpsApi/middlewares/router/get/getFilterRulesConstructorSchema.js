const { fields, filterTypes } = global.$appConfig.forClient.filter
if (!Array.isArray(fields) || !Array.isArray(filterTypes)) {
  throw new Error('fields || filterTypes - is not array')
}
module.exports = function() {
  return {
    path: '/getFilterRulesConstructorSchema',
    async handler(ctx) {
      try {
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
        const allGroups = await services?.getAllGroupsDataOfUser(user)

        if (!Array.isArray(allGroups)) {
          ctx.status = 500
          return
        }

        const groups = allGroups.map(({ id, name }) => ({
          id,
          name,
        }))

        ctx.body = {
          groups,
          fields,
          filterTypes,
        }
      } catch (error) {
        ctx.status = 500
        console.error(error)
      }
    },
  }
}
