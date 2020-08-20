import Vue from 'vue'
import Vuex from 'vuex'
import { fetchEvents } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search: '',
    events: []
  },
  mutations: {
    setEvents (state, events) {
      state.events = events
    },
    setSearch (state, search) {
      state.search = search
    }
  },
  actions: {
    async updateEvents ({ commit }, searchParam = '') {
      const events = await fetchEvents(searchParam)
      commit('setEvents', events)
    }
  },
  modules: {
  }
})
