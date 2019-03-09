new Vue({
  name: 'game',
  el: '#app',
  template: `<div id="#app" v-bind:class="cssClass">{{ worldRatio }}
    <top-bar v-bind:turn="turn" v-bind:current-player-index="currentPlayerIndex" v-bind:players="players" />  
    <div class="world">
      <castle v-for="(player, index) in players" v-bind:player="player" v-bind:key="player.name" 
        v-bind:index="index" />
      <div class="land" />
    </div>
    <!--<card v-bind:def="testCard" v-on:play="handlePlay" /> -->
    <transition name="hand">
      <hand v-if="!activeOverlay" v-bind:cards="currentHand"  v-on:card-play="handlePlayCard" 
        v-on:card-leave-end="handleCardLeaveEnd" />
    </transition>
    <transition name="zoom">
      <overlay v-if="activeOverlay" v-bind:key="activeOverlay" v-on:close="handleOverlayClose">
        <component v-bind:is="'overlay-content-' + activeOverlay" v-bind:key="activeOverlay"
          v-bind:player="currentPlayer" v-bind:opponent="currentOpponent" v-bind:players="players" />
      </overlay>
    </transition>  
    <transition name="fade">
      <div class="overlay-background" v-if="activeOverlay" />
    </transition>
    <div class="clouds">
      <cloud v-for="index in 10" v-bind:type="(index -1) % 5 + 1" v-bind:key="index" />
    </div>
  </div>`,
  mounted() {
    // this.testHand = this.createTestHand()
    // console.log('testhand:', this.testHand)
    beginGame()
  },
  data: state,
  computed: {
    testCard() {
      return cards.archers
    },
    cssClass() {
      return { 'can-play': this.canPlay, }
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
    },
    handlePlayCard(card) {
      playCard(card)
    },
    handleCardLeaveEnd() {
      applyCard()
    },
    handleOverlayClose(){
      overlayCloseHandlers[this.activeOverlay]()
    }
  }
})
window.addEventListener('resize', () => {
  state.worldRatio = getWorldRatio()
})
requestAnimationFrame(animate);
function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

function beginGame() {
  state.players.forEach(drawInitialHand)
}

function playCard(card) {
  if (state.canPlay) {
    state.canPlay = false
    currentPlayingCard = card
    const index = state.currentPlayer.hand.indexOf(card)
    state.currentPlayer.hand.splice(index, 1)

    addCardToPile(state.discardPile, card.id)
  }
}

function applyCard() {
  const card = currentPlayingCard

  applyCardEffect(card)

  setTimeout(() => {
    state.players.forEach(checkPlayerLost)
    if (isOnePlayerDead()) {
      endGame()
    } else {
      nextTurn()
    }
  }, 700)
}

function nextTurn() {
  state.turn++
  state.currentPlayerIndex = state.currentOpponentId
  state.activeOverlay = 'player-turn'
}
function endGame() {
  state.activeOverlay = 'game-over'
}
function newTurn() {
  state.activeOverlay = null
  if (state.currentPlayer.skipTurn) {
    skipTurn()
  } else {
    startTurn()
  }
}
function skipTurn() {
  state.currentPlayer.skippedTurn = true
  state.currentPlayer.skipTurn = false
  nextTurn()
}
function startTurn() {
  state.currentPlayer.skippedTurn = false
  if (state.turn > 2) {
    setTimeout(() => {
      state.currentPlayer.hand.push(drawCard())
      state.canPlay = true
    }, 800)
  } else {
    state.canPlay = true
  }
}
var overlayCloseHandlers = {
  'player-turn'() {
    if (state.turn > 1) {
      state.activeOverlay = 'last-play'
    } else {
      newTurn()
    }
  },
  'last-play'() {
    newTurn()
  },
  'game-over'() {
    document.location.reload()
  }
}