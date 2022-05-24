<template>
  <div>
    <MyHeader></MyHeader>
    <div class="about">
      <el-row>
        <el-col
          :xs="{ span: 22, offset: 1 }"
          :sm="{ span: 16, offset: 4 }"
          :md="{ span: 14, offset: 5 }"
          :lg="{ span: 14, offset: 5 }"
          :xl="{ span: 14, offset: 5 }"
        >
          <el-card class="jiayou">
            <h3>关于我</h3>
            <p>家乡在湖南一个依山傍水的小城市...</p>
            <p>对互联网充满热情，对编程和计算机技术充满好奇心!</p>
            <p>喜欢听歌，尤其喜欢听张国荣、张学友的歌~</p>
            <p>天气好的话会去公园跑跑步，遇到的问题跑两圈解决思路就清晰了^_^</p>
          </el-card>
          <el-card class="jiayou">
            <h3>关于本站</h3>
            <p>本站旨在记录我的技术学习和成长的历程</p>
            <p>前端部分主要使用 Vue框架 和 Element UI库</p>
            <p>后端部分基于 Node.js 使用 Express框架创建服务器</p>
            <p>使用 mongoose模块 操作 MongoDB数据库</p>
          </el-card>
          <el-card class="jiayou">
            <h3>联系我</h3>
            <p>你可以在以下平台联系我/与我交流</p>
            <ul>
              <li>Github：<a href="https://github.com/AyauLee">AyauLee</a></li>
              <li>QQ：603759211</li>
              <li>Email：xi.xz@foxmail.com</li>
            </ul>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
export default {
  name: "GetLinks",
};
</script>

<style lang='less' scoped>
.about {
  min-height: calc(100vh - 160px);
  .jiayou {
    padding: 20px 40px;
    margin-bottom: 40px;
    h3 {
      padding-bottom: 20px;
      text-align: left;
    }
    p {
      padding: 5px 0;
      text-align: left;
    }
    ul {
      padding: 20px;
      li {
        list-style-type: disc;
        padding: 10px;
        text-align: left;
      }
    }
  }
}
</style>