new Vue({
  name: 'game',
  el: '#app',
  template: `<div id="#app">{{ worldRatio }}
    <top-bar v-bind:turn="turn" v-bind:current-player-index="currentPlayerIndex" v-bind:players="players" />  
  </div>`,
  mounted() {
    console.log(this.$data === state)
  },
  data: state,
})
window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})