const mutations = {
    setAudiolist(state, payload) {
      state.audiolist = [...payload]
    },
    setAP(state, payload) {
        state.ap = payload
    },
    setPlayIndex(state, payload) {
        state.palyIndex = payload
    },
    setaudioShow(state, payload) {
        state.audioShow = payload
    },
}
export { mutations }