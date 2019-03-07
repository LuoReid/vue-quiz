new Vue({
  name: 'game',
  el: '#app',
  template: `<div id="#app">{{ worldRatio }}
    <top-bar v-bind:turn="turn" v-bind:current-player-index="currentPlayerIndex" v-bind:players="players" />  
    <div class="world">
      <castle v-for="(player, index) in players" v-bind:player="player" v-bind:index="index" />
      <div class="land" />
    </div>
    <card v-bind:def="testCard" v-on:play="handlePlay" /> 
    <transition name="hand">
      <hand v-if="!activeOverlay" v-bind:cards="testHand"  v-on:card-play="testPlayCard" />
    </transition>
    <transition name="zoom">
      <overlay v-if="activeOverlay">
        <component v-bind:is="'overlay-content-' + activeOverlay" v-bind:key="activeOverlay"
          v-bind:player="currentPlayer" v-bind:opponent="currentOpponent" v-bind:players="players" />
      </overlay>
    </transition>  
    <transition name="fade">
      <div class="overlay-background" v-if="activeOverlay" />
    </transition>
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