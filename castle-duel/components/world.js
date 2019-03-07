Vue.component('castle', {
  template: `<div class="castle" v-bind:class="'player-' + index">
    <img class="building" v-bind:src="'svg/castle' + index + '.svg'" />
    <img class="ground" v-bind:src="'svg/ground' + index + '.svg'" />
    <castle-banners v-bind:player="player" />
  </div>`,
  props: ['players', 'index'],
})
Vue.component('castle-banners', {
  template: `<div class="banners">
    <img class="food-icon" src="svg/food-icon.svg" />
    <bubble type="food" v-bind:value="player.food" v-bind:ratio="foodRatio" />
    <img class="health-icon" src="svg/health-icon.svg" />
    <bubble type="health" v-bind:value="player.health" v-bind:ratio="healthRatio" />
  </div>`,
  props: ['player'],
  computed: {
    foodRatio() {
      return this.player.food / maxFood
    },
    healthRatio() {
      return this.player.health / maxHealth
    },
  }
})
Vue.component('bubble', {
  template: `<div class="stat-bubble" v-bind:class="type + '-bubble'" v-bind:style="bubbleStyle">
    <img v-bind:src="'svg/' + type + '-bubble.svg'" />
    <div class="counter">{{value}}</div>
  </div>`,
  props: ['type', 'value', 'ratio'],
  computed: {
    bubbleStyle() {
      return { top: (this.ratio * 220 + 40) * state.worldRatio + 'px', }
    }
  }
})