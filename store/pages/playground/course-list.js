const init = {
  filters: {
    categoryId: null,
    learningProgress: null,
    instructorId: null
  }
}

export const state = () => {
  return {
    filters: { ...init.filters }
  }
}

export const getters = {
  getFilterByName(state) {
    return state.filters
  }
}

export const mutations = {
  setFilter(state, { name, value }) {
    if (state.filters[name] !== undefined) {
      state.filters[name] = value
    }
  },
  setFilters(state, filters) {
    state.filters = filters
  },
  resetFilters(state) {
    state.filters = { ...init.filters }
  }
}

export const actions = {
  setFilter({ commit }, { name, value }) {
    commit('setFilter', { name, value })
  },
  setFilters({ commit }, filters) {
    commit('setFilters', filters)
  },
  resetFilters({ commit }) {
    commit('resetFilters')
  }
}
