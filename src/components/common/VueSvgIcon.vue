<template>
  <div :style="appHeader">
    <div :style="left">
      <transition
        name="rotate"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <img
          v-if="showImage"
          :src="require('@/assets/logo2.svg')"
          alt="reactLogo"
          :style="rotatingImageStyle"
        />
      </transition>
    </div>
    <div :style="middle">{{ text }}</div>
    <div :style="right">
      <img
        :src="icon"
        :alt="iconClass"
        :class="iconClass"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: ['VueSvgIcon'],

  props: {
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      appHeader: {
        backgroundColor: '#222',
        height: '50px',
        width: 'auto',
        color: 'red'
      },
      left: { display: "inline", textAlign: "left" },
      middle: { display: "inline", textAlign: "center" },
      right: { display: "inline", textAlign: "right" },
      rotatingImageStyle: {
        animation: 'rotate3d 10s infinite alternate',
        width: '50px'
      },
      showImage: true,
      rotateValue: 'rotateX(0) rotateY(0) rotateZ(0)'
    };
  },

  methods: {
    beforeEnter(el) {
      if (el && el.style) {
        el.style.transform = 'rotateX(0) rotateY(0) rotateZ(0)';
      }
    },
    enter(el, done) {
      if (el && el.style) {
        const animationDuration = 10000; // in milliseconds
        el.style.transition = `transform ${animationDuration}ms ease-in-out`;
        el.style.transform = 'rotateX(360deg) rotateY(360deg) rotateZ(360deg)';

        setTimeout(() => {
          this.rotateValue = 'rotateX(360deg) rotateY(360deg) rotateZ(360deg)';
          done();
        }, animationDuration);
      }
    },
    leave(el, done) {
      if (el && el.style) {
        el.style.transition = 'transform 1000ms ease-in-out';
        el.style.transform = 'rotateX(0) rotateY(0) rotateZ(0)';
        done();
      }
    }
  },

  watch: {
    rotateValue() {
      setInterval(() => {
        this.rotateValue = this.rotateValue === 'rotateX(360deg) rotateY(360deg) rotateZ(360deg)'
          ? 'rotateX(0) rotateY(0) rotateZ(0)'
          : 'rotateX(360deg) rotateY(360deg) rotateZ(360deg)';
      }, 10000);
    }
  },

  created() {
    this.rotateValue = 'rotateX(360deg) rotateY(360deg) rotateZ(360deg)';
  }
};
</script>

<style scoped>
.rotate-enter-active, .rotate-leave-active {
  transition: transform 10s;
}
.rotate-enter, .rotate-leave-to /* .rotate-leave-active in <2.1.8 */ {
  transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
}
</style>
