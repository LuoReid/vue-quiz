new Vue({
  name: 'game',
  el: '#app',
  template: `<div id="#app">{{ worldRatio }}
    <top-bar v-bind:turn="turn" v-bind:current-player-index="currentPlayerIndex" v-bind:players="players" />  
    <card v-bind:def="testCard" v-on:play="handlePlay" /> 
    <transition name="hand">
      <hand v-if="!activeOverlay" v-bind:cards="testHand"  v-on:card-play="testPlayCard" />
    </transition>
    <overlay v-if="activeOverlay">
      <overlay-content-player-turn v-if="activeOverlay === 'player-turn'" v-bind:player="currentPlayer" />
      <overlay-content-last-play v-else-if="activeOverlay === 'last-play'" v-bind:opponent="currentOpponent" />
      <overlay-content-game-over v-else-if="activeOverlay === 'game-over'" v-bind:players="players" />
    </overlay>
  </div>`,
  mounted() {
    this.testHand = this.createTestHand()
    console.log('testhand:', this.testHand)
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
      const cards = []
      const ids = Object.keys(cards)
      for (let i = 0; i < 5; i++) {
        cards.push(this.testDrawCard())
      }
      return cards
    },
    testDrawCard() {
      const ids = Object.keys(cards)
      const randomId = ids[Math.floor(Math.random() * ids.length)]
      return {
        uid: cardUid++,
        id: randomId,
        def: cards[randomId],
      }
    },
    testPlayCard(card) {
      console.log('testPlayCard', card)
      const index = this.testHand.indexOf(card)
      this.testHand.splice(index, 1)
    }
  }
})
window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})