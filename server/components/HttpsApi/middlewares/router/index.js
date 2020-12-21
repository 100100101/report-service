const KoaRouter = require('@koa/router')
const getsPostRouts = require('./post')
const getsGetRouts = require('./get')

module.exports = function(koaInstance) {
  const koaRouter = new KoaRouter()

  const routesOfMethods = [
    ['get', getsGetRouts],
    ['post', getsPostRouts],
  ]

  // Set routes
  for (const routesOfMethodEntry of routesOfMethods) {
    const methodName = routesOfMethodEntry[0]
    const getRoutesOfMethod = routesOfMethodEntry[1]
    for (const getRouteOfMethod of getRoutesOfMethod) {
      const routeOfMethod = getRouteOfMethod.call(this)
      koaRouter[methodName](
        routeOfMethod.path,
        routeOfMethod.handler.bind(this)
      )
    }
  }

  // koaInstance.use(koaRouter.allowedMethods())

  return koaRouter.routes()
}
