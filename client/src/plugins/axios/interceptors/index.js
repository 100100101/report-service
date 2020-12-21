import needLogoutResponseInterceptor from './response/needLogout'
export default axios => {
  ;[needLogoutResponseInterceptor].forEach(interceptor => {
    interceptor(axios)
  })
}
