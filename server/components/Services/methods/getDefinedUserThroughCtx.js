module.exports = async function(ctx) {
  const requestAuthToken = ctx.cookies.get('authToken')
  if (!requestAuthToken) {
    return
  }
  const user = this.getUserByAuthToken(requestAuthToken)
  if (!user) {
    return
  }
  return user
}
