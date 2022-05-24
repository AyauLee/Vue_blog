<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <x-aside></x-aside>
    </el-aside>
    <el-container>
      <el-header>
        <x-header></x-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import XAside from "@/components/XAside";
import XHeader from "@/components/XHeader";
export default {
  name: "XMain",
  components: { XAside, XHeader },
  mounted() {
    this.$store.dispatch("getUserInfo");
  },
};
</script>

<style lang='less' scoped>
.el-header {
  height: 60px;
  background-color: #1f2935;
  border-left: 1px solid #ccc;
  box-shadow: 0 0 7px 3px #ccc;
}
</style>