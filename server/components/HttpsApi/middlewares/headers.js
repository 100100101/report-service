const ACCESS_CONTROL_ALLOW_ORIGIN = process.env.ACCESS_CONTROL_ALLOW_ORIGIN
if (!ACCESS_CONTROL_ALLOW_ORIGIN) {
  throw 'ACCESS_CONTROL_ALLOW_ORIGIN is not defined'
}
module.exports = function() {
  return async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', ACCESS_CONTROL_ALLOW_ORIGIN)
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEAD,OPTIONS')
    ctx.set(
      'Access-Control-Allow-Headers',
      ctx.get('Access-Control-Request-Headers')
    )
    // ctx.set('Vary', 'Origin')
    if (ctx.method === 'OPTIONS') {
      ctx.status = 204
    }
    await next()
  }
}
