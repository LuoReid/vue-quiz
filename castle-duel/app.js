new Vue({
  name: 'game',
  el: '#app',
  template: `<div id="#app">{{ worldRatio }}
    <top-bar v-bind:turn="turn" v-bind:current-player-index="currentPlayerIndex" v-bind:players="players" />  
    <card v-bind:def="testCard" v-on:play="handlePlay" />
  </div>`,
  mounted() {
    console.log(this.$data === state)
  },
  data: state,
  computed:{
    testCard(){
      return cards.archers
    }
  },
  methods:{
    handlePlay(){
      console.log('You played a card!')
    }
  }
})
window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})