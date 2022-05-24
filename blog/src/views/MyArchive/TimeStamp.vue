<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        :timestamp="cate.timecate"
        placement="top"
        v-for="cate in archiveList"
        :key="cate.timecate"
      >
        <el-card
          v-for="doc in cate.docs"
          :key="doc._id"
          style="margin-top: 30px"
        >
          <div class="catedoc" @click="goArticle(doc._id)">
            <h2>{{ doc.title }}</h2>
            <p>{{ doc.introduction }}</p>
          </div>
          <p class="posted font-mt">
            Posted by {{ doc.author }} on {{ doc.date }}
          </p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: "TimeStamp",
  mounted() {
    this.$store.dispatch("archiveList");
  },
  computed: {
    archiveList() {
      return this.$store.state.article.archiveList;
    },
  },
};
</script>

<style lang='less' scoped>
.block {
  margin-top: 50px;
  /deep/.el-timeline-item__timestamp {
    text-align: left;
    color: #fff;
  }
  .catedoc {
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
  .posted {
    padding: 20px 40px 0 0;
    color: #777;
    text-align: right;
    text-indent: initial;
  }
}
</style>