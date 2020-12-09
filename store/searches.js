export const state = () => ({
  searches: [],
})

export const mutations = {
  searches(state, payload) {
    const newState = state.searches.concat()
    newState.push(payload)
    state.searches = newState
  },
}

export const actions = {
  setSearches(context, payload) {
    context.commit('searches', payload)
  },
}

export const getters = {
  searches: (s) => s.searches,
}
