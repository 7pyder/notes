export default {
  state: {
    user: {},
    notes: [],
    query: {}
  },
  getters: {
    user (state) {
      return state.user
    },
    notes (state) {
      return state.notes
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setNotes (state, notes) {
      state.notes = notes
    },
    filter (state, params) {
      state.repos = state.repos
      state.query = params
    }
  }
}
