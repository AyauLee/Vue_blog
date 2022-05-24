<template>
  <div>
    <!-- 标签区域 -->
    <div class="tags c-gray">
      <h2 class="font-mt" style="color: gray">Article Category Tag</h2>
      <div class="tag-group">
        <el-tag
          v-for="item in cateList"
          :key="item.id"
          :type="item.ctype"
          effect="dark"
          style="margin: 15px"
        >
          <router-link :to="`/archive/artcate?tag=${item.catename}`">{{
            item.catename
          }}</router-link>
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyTags",
  computed: {
    cateList() {
      return this.$store.state.article.catelist;
    },
  },
  mounted() {
    this.$store.dispatch("artcate");
  },
};
</script>