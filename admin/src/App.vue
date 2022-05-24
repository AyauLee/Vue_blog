<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less">
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
#app {
  width: 100vw;
  height: 100vh;
  font-family: cursive, "Microsoft YaHei", Arial, Tahoma, "Hiragino Sans GB";
  font-size: 16px;
  background-color: #ebedee;
  a {
    text-decoration: none;
    color: #fff;
  }
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*⾼宽分别对应横竖滚动条的尺⼨*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条⾥⾯⼩⽅块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.1);
  background: #409eff;
}
::-webkit-scrollbar-track {
  /*滚动条⾥⾯轨道*/
  box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
  border-radius: 10px;
  background: #ededed;
}
</style>
