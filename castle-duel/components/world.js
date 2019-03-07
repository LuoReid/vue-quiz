Vue.component('castle', {
  template:`<div class="castle" v-bind:class="'player-' + index">
    <img class="building" v-bind:src="'svg/castle' + index + '.svg'" />
    <img class="ground" v-bind:src="'svg/ground' + index + '.svg'" />
  </div>`,
  props:['players','index'],
})