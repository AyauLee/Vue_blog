<template>
  <div>
    <el-card v-for="item in artList" :key="item._id" style="margin-top: 30px">
      <div class="content">
        <div class="artbox" @click="goArticle(item._id)">
          <h2>{{ item.title }}</h2>
          <p>{{ item.introduction }}</p>
        </div>
        <p class="author font-mt">
          Posted by {{ item.author }} on {{ item.date }}
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ArtCate",
  computed: {
    tag() {
      return this.$route.query.tag;
    },
    artList() {
      return this.$store.state.article.artListByTag;
    },
  },
  watch: {
    tag: {
      immediate: true, //初始化时让handler调用一下
      //handler什么时候调用？当isHot发生改变时。
      handler(newVal) {
        this.$store.dispatch("artListByTag", newVal);
      },
    },
  },
};
</script>

<style lang='less' scoped>
.content {
  padding: 10px;
  .artbox {
    padding: 0 30px;
    text-align: left;
    cursor: pointer;
    &:hover {
      h2,
      p {
        color: aqua;
      }
    }
    h2 {
      padding-bottom: 20px;
    }
    p {
      color: #777;
      text-indent: 2em;
    }
  }
  .author {
    padding: 20px 50px 0 0;
    color: #777;
    text-align: right;
    text-indent: initial;
  }
}
</style>