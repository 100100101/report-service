import store from '@/store'
export default axios => {
  axios.interceptors.response.use(
    response => response,
    error => {
      const responseStatus = error?.response?.status
      if (responseStatus === 401) {
        store.commit('logout')
      }
      return Promise.reject(error)
    }
  )
}
