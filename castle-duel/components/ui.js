Vue.component('top-bar', {
  template: `<div class="top-bar" v-bind:class="'player-' + currentPlayerIndex">
    <div class="player p0">{{players[0].name}} </div>
    <div class="turn-counter">
      <div class="turn">Turn {{turn}} </div>
    </div>  
    <div class="player p1">{{players[1].name}} </div>
  </div>`,
  props: ['players', 'currentPlayerIndex', 'turn'],
  created() {
    console.log(this.players);
  }
})
Vue.component('card', {
  template: `<div class="card" v-bind:class="'type-' + def.type" v-on:click="play">
    <div class="title">{{def.title}} </div>
    <img class="separator" src="svg/card-separator.svg" />
    <div class="description"><div v-html="def.description"></div></div>
    <div class="note" v-if="def.note"><div v-html="def.note"></div></div>
  </div>`,
  props: ['def'],
  methods: {
    play() {
      console.log('play')
      this.$emit('play')
      // this.$on('play', () => {
      //   console.log('Caught a play event!')
      // })
    }
  }
})
Vue.component('hand', {
  template: `<div class="hand">
    <div class="wrapper">
      <transition-group name="card" tag="div" class="cards">
        <card v-for="card of cards" v-bind:def="card.def" v-bind:key="card.uid" v-on:play="handlePlay(card)" />
      </transition-group>  
    </div>
  </div>`,
  props: ['cards'],
  methods: {
    handlePlay(card) {
      console.log('handlePlay')
      this.$emit('card-play', card)
    }
  },
})