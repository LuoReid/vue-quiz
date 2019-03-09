Vue.component('castle', {
  template: `<div class="castle" v-bind:class="'player-' + index">
    <img class="building" v-bind:src="'svg/castle' + index + '.svg'" />
    <img class="ground" v-bind:src="'svg/ground' + index + '.svg'" />
    <castle-banners v-bind:player="player" />
  </div>`,
  props: ['player', 'index'],
})
Vue.component('castle-banners', {
  template: `<div class="banners">
    <img class="food-icon" src="svg/food-icon.svg" />
    <bubble type="food" v-bind:value="player.food" v-bind:ratio="foodRatio" />
    <banner-bar class="food-bar" color="#288339" v-bind:ratio="foodRatio" />
    <img class="health-icon" src="svg/health-icon.svg" />
    <bubble type="health" v-bind:value="player.health" v-bind:ratio="healthRatio" />
    <banner-bar class="health-bar" color="#9b2e2e" v-bind:ratio="healthRatio" />
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
Vue.component('banner-bar', {
  template: '#banner',
  props: ['color', 'ratio'],
  computed: {
    targetHeight() {
      return 220 * this.ratio + 40
    },
  },
  data() {
    return {
      height: 0,
    }
  },
  created() {
    this.height = this.targetHeight
  },
  watch: {
    targetHeight(newVal, oldVal) {
      const vm = this
      new TWEEN.Tween({ value: oldVal })
        .easing(TWEEN.Easing.Cubic.InOut)
        .to({ value: newVal }, 500)
        .onUpdate(function () {
          vm.height = this.value.toFixed(0)
        }).start()
    }
  }
})
Vue.component('cloud', {
  template: `<div class="cloud" v-bind:class="'cloud-' + type" v-bind:style="style">
    <img v-bind:src="'svg/cloud' + type + '.svg'" v-on:load="initPosition" />
  </div>`,
  props: ['type'],
  data() {
    return {
      style: {
        transform: 'none',
        zIndex: 0,
      }
    }
  },
  methods: {
    setPosition(left, top) {
      this.style.transform = `translate(${left}px,${top}px)`
    },
    initPosition() {
      const width = this.$el.clientWidth
      this.setPosition(-width, 0)
    },
    startAnimation(delay = 0) {
      const vm = this
      const width = this.$el.clientWidth
      const { min, max } = cloudAnimationDurations
      const animationDuration = Math.random() * (max - min) + min
      this.style.zIndex = Math.round(max - animationDuration)

      const top = Math.random() * (window.innerHeight * 0.3)
      new TWEEN.Tween({ value: -width })
        .to({ value: window.innerWidth }, animationDuration).delay(delay)
        .onUpdate(function () {
          vm.setPosition(this.value, top)
        })
        .onComplete(() => {
          this.startAnimation(Math.random() * 10000)
        }).start()
    }
  }
})
const cloudAnimationDurations = { min: 10000, max: 50000, }