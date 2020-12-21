const https = require('https')
const Koa = require('koa')
const initMiddlewares = require('./middlewares/')

class HttpHttpsApi {
  constructor(services) {
    try {
      this.services = services

      const {
        httpsApi: { host, port, requestCert, rejectUnauthorized, key, cert },
      } = global.$appConfig

      this.koaInstance = new Koa()
      this.koaInstance.proxy = true

      this.initMiddlewares(this.koaInstance)

      this.httpsApiServer = https
        .createServer(
          {
            requestCert,
            rejectUnauthorized,
            key,
            cert,
          },
          this.koaInstance.callback()
        )
        .listen(port, host, error => {
          if (error) {
            throw new Error('Failed to start https server')
          }
          console.log(`Https server started on ${host}:${port}`)
        })
    } catch (error) {
      console.error(error)
    }
  }
}
HttpHttpsApi.prototype.initMiddlewares = initMiddlewares
module.exports = HttpHttpsApi
