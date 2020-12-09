const url = `https://gist.githubusercontent.com/gorborukov/0722a93c35dfba96337b/raw/435b297ac6d90d13a68935e1ec7a69a225969e58/russia`
const options = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}

export const state = () => ({
  cities: [],
})

export const mutations = {
  setCities(state, cities) {
    state.cities = cities
  },
}

export const actions = {
  async fetch({ commit }) {
    const rawCities = await this.$axios.get(url, { options })
    const cities = []
    rawCities.data.forEach((element) => {
      cities.push(element.city)
    })
    commit(`setCities`, cities)
  },
}

export const getters = {
  cities: (s) => s.cities,
}
