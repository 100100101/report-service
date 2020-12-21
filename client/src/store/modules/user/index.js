import axios from 'axios'
import { checkedIsObject } from '@/utils'
const getDefaultState = () => ({
  fullname: '',
  isAuthenticatedUser: false,
})

export default {
  state: getDefaultState(),
  mutations: {
    updateUserData: (state, userData) => {
      Object.assign(state, userData)
    },
    logout: state => {
      Object.assign(state, getDefaultState())
    },
    setAuthenticatedUserStatus: (state, isAuthenticatedUser) => {
      state.isAuthenticatedUser = isAuthenticatedUser
    },
  },
  actions: {
    signIn({ commit }, loginPayload) {
      const options = {
        url: 'signIn',
        method: 'POST',
      }
      if (loginPayload) {
        options.data = loginPayload
      }
      return axios(options).then(singInResponse => {
        if (!singInResponse || singInResponse.status !== 200) {
          return
        }
        const userData = singInResponse.data
        if (!checkedIsObject(userData)) {
          return
        }
        commit('updateUserData', userData)
        commit('setAuthenticatedUserStatus', true)
      })
    },
  },
}
