new Vue({
  name: 'game',
  el: '#app',
  template: `<div id="#app">{{ worldRatio }}
    <top-bar v-bind:turn="turn" v-bind:current-player-index="currentPlayerIndex" v-bind:players="players" />  
    <card v-bind:def="testCard" v-on:play="handlePlay" />
    <hand v-bind:cards="testHand" />
  </div>`,
  mounted() {
    console.log(this.$data === state)
    this.testHand = this.createTestHand()
    console.log(this.testHand);
  },
  data: state,
  computed: {
    testCard() {
      return cards.archers
    }
  },
  methods: {
    handlePlay() {
      console.log('You played a card!')
    },
    createTestHand() {
      const testcards = []
      const ids = Object.keys(cards)
      console.log(cards)
      for (let i = 0; i < 5; i++) {
        testcards.push(cards[ids[Math.floor(Math.random() * ids.length)]])
      }
      return testcards
    },
    testDrawCard() {
      const ids = Object.keys(cards)
      const randomId = ids[Math.floor(Math.random() * ids.length)]
      return {
        uid: cardUid++,
        id: randomId,
        def: cards[randomId].def,
      }
    }
  }
})
window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})