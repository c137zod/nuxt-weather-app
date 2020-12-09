export const state = () => ({
  weathers: [],
})

export const mutations = {
  weathers(state, payload) {
    state.weathers = payload
  },
}

export const actions = {
  setWeathers(context, payload) {
    context.commit('weathers', payload)
  },
}

export const getters = {
  weathers: (s) => s.weathers,
}
