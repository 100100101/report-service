import store from '@/store'

export default async (to, from, next) => {
  const stateUser = store?.state?.user
  if (!stateUser) {
    return
  }
  let isAuthenticatedUser = stateUser?.isAuthenticatedUser
  const isToAuthRoute = to.name === 'Auth'
  if (!isToAuthRoute && !isAuthenticatedUser) {
    await store.dispatch('signIn')
    if (!stateUser?.isAuthenticatedUser) {
      next({ name: 'Auth' })
      return
    }
  }
  next()
}
