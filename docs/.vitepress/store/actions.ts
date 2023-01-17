const actions = {
    asyncAddStoreCount(store, payload) { // 第一个参数是vuex固定的参数，不需要手动去传递
        store.commit("addCount", payload)
    },
}
export { actions }