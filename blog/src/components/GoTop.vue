<template>
  <div @click="goTop" class="goTop" v-show="topShow">
    <i class="el-icon-thumb"></i>
  </div>
</template>

<script>
export default {
  name: "GoTop",
  data() {
    return {
      topShow: false,
    };
  },
  watch: {
    currScroll(newVal) {
      newVal > 200 ? (this.topShow = true) : (this.topShow = false);
    },
  },
  methods: {
    goTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style lang='less' scoped>
.goTop {
  position: fixed;
  right: 6vw;
  bottom: 30%;
  width: 30px;
  height: 30px;
  font-size: 25px;
  color: plum;
  cursor: pointer;
  &:hover {
    color: orangered;
  }
}
</style>