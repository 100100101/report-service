import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import modules from './modules'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => {
    const { filterRules, additionalFields } = state
    return {
      filterRules,
      additionalFields,
    }
  },
})

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: () => ({
    filterRulesConstructorSchema: null,
    filterRules: [],
    additionalFields: [],
    report: null,
  }),
  mutations,
  getters,
  actions,
  modules,
  plugins: [vuexLocal.plugin],
})
