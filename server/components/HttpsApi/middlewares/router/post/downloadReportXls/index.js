const fs = require('fs')
const path = require('path')
const excel = require('node-excel-export')

const specification = global.$appConfig.filter.fields
module.exports = function() {
  return {
    path: '/downloadReportXls',
    async handler(ctx) {
      try {
        const filterOptions = ctx.request.body

        if (!filterOptions) {
          ctx.status = 500
          return
        }

        const user = await this?.services?.getDefinedUserThroughCtx(ctx)

        if (!user) {
          ctx.status = 500
          return
        }

        const validatedFilterOptions = await this.services.filterOptionsValidate(
          filterOptions
        )

        if (!validatedFilterOptions) {
          ctx.status = 500
          return
        }

        const filteredCarsResult = await this.services
          .getCarsForUserWithFilter(user, validatedFilterOptions)
          .catch(error => {
            console.error(error)
          })

        if (!global.$appUtils.checkedIsObject(filteredCarsResult)) {
          ctx.status = 500
          return
        }

        const filteredCars = filteredCarsResult.objects

        if (!Array.isArray(filteredCars)) {
          ctx.status = 500
          return
        }

        const filteredCarsSchema = filteredCarsResult.schema

        if (!Array.isArray(filteredCarsSchema)) {
          ctx.status = 500
          return
        }

        const filteredCarsFieldsByKey = filteredCarsSchema.reduce(
          (accumulator, field) => {
            const fieldKey = field.key
            if (fieldKey) {
              accumulator[fieldKey] = field
            }
            return accumulator
          },
          {}
        )

        const report = excel.buildExport([
          {
            // name: 'Report', // <- Specify sheet name (optional)
            // heading: heading, // <- Raw heading array (optional)
            // merges: merges, // <- Merge cell ranges
            specification: filteredCarsFieldsByKey, // <- Report specification
            data: filteredCars, // <-- Report data
          },
        ])

        if (!report) {
          ctx.status = 500
          return
        }

        ctx.body = report
      } catch (error) {
        console.error(error)
        ctx.status = 500
      }
    },
  }
}
