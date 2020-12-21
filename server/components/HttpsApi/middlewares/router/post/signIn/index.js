const setAuthTokenToCookies = require('./setAuthTokenToCookies')
const checkedIsObject = global.$appUtils.checkedIsObject
module.exports = function() {
  return {
    path: '/signIn',
    async handler(ctx) {
      try {
        const signInPayload = ctx.request.body
        if (!checkedIsObject(signInPayload)) {
          ctx.status = 500
          return
        }
        const payloadLogin = signInPayload.login
        const payloadPassword = signInPayload.password
        let isAuthByLoginPassword = false
        let user = null
        if (payloadLogin && payloadPassword) {
          isAuthByLoginPassword = true
          user = await this?.services?.getUserByLoginPassword(
            payloadLogin,
            payloadPassword
          )
          if (!user) {
            ctx.status = 401
            return
          }
        } else {
          user = await this?.services?.getDefinedUserThroughCtx(ctx)
          if (!user) {
            ctx.status = 401
            return
          }
        }

        const userFullName = user.fullname
        if (!userFullName) {
          ctx.status = 500
          return
        }

        if (isAuthByLoginPassword) {
          const isTokenSet = setAuthTokenToCookies(ctx, user)
          if (!isTokenSet) {
            ctx.status = 500
            return
          }
        }

        ctx.body = { fullname: userFullName }
      } catch (error) {
        console.error(error)
        ctx.status = 500
      }
    },
  }
}
