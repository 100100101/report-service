const headers = require('./headers')
const bodyParser = require('./bodyParser')
const router = require('./router')
module.exports = function(koaInstance) {
  const middlewareGets = [headers, bodyParser, router]
  for (const getMiddleware of middlewareGets) {
    koaInstance.use(getMiddleware.call(this, koaInstance))
  }
}
