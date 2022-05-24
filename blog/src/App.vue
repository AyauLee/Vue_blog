<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import * as sysTool from "@/assets/js/systemTool";
import { submitinfo } from "@/api";
export default {
  name: "App",
  methods: {
    sendInfo() {
      let ip = sessionStorage.getItem("ip");
      let area = sessionStorage.getItem("area");
      let brower = sysTool.GetCurrentBrowser();
      let os = sysTool.GetOs();
      submitinfo({ ip, area, brower, os })
        .then(() => {})
        .catch(() => {});
    },
  },
  mounted() {
    this.sendInfo();
  },
};
</script>

<style lang="less">
#app {
  font-family: Cursive, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  line-height: 1.5;
  color: #fff;
}
body {
  background: url("./views/images/雾漫小东江.jpg") no-repeat fixed;
  background-size: cover;
}
.font-mt {
  font-family: "Brush Script MT", Arial, Helvetica, sans-serif;
}
.font-xk {
  font-family: Cursive !important;
}
.c_gray {
  color: gray !important;
}
a:hover {
  color: orangered;
}
.tags {
  a {
    color: #fff;
    &:hover {
      color: purple;
      text-decoration: underline;
    }
  }
}
.bg-dark {
  background: rgba(0, 0, 0, 0.8);
  padding: 8%;
  margin-bottom: 8%;
}
.test {
  transform: scale(0.6); //滚动前的位置
  opacity: 0; //滚动前设置透明隐藏
}
.testenter {
  transform: scale(1) !important; //滚动后的位置
  opacity: 1 !important; //滚动后显现
  transition: all 0.5s ease;
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
  background: skyblue;
}
::-webkit-scrollbar-track {
  /*滚动条⾥⾯轨道*/
  box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
  border-radius: 10px;
  background: #ededed;
}
</style>
