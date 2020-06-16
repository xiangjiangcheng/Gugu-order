export default {
  openLoading (state) {
    state.loading = true
  },
  closeLoading (state) {
    state.loading = false
  },
  setPageShow (state) {
    state.showPage = true
  },
  setPageHide (state) {
    state.showPage = false
  }
}
