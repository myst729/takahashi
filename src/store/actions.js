export function meta ({ commit, state }, meta) {
  commit('setMeta', { meta })
}

export function slides ({ commit, state }, slides) {
  commit('setSlides', { slides })
}

export function page ({ commit, state }, page) {
  commit('setPage', { page })
}
