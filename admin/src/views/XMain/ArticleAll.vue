<template>
  <div style="height: 100%">
    <el-table :data="articleData" style="width: 100%" height="100%">
      <el-table-column type="expand" style="width: 100%">
        <template slot-scope="props">
          <div class="markbody">
            <h4>文章简介</h4>
            <p>{{ props.row.introduction }}</p>
            <div v-html="props.row.body"></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="文章标题" prop="title"> </el-table-column>
      <el-table-column label="文章封面图">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.cover"
            :preview-src-list="[scope.row.cover]"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="标签">
        <template slot-scope="scope">
          <span v-for="item in scope.row.tags" :key="item" class="tags">{{
            item
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布者" prop="author" width="100px">
      </el-table-column>
      <el-table-column label="发布时间" prop="date"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// marked
import { marked } from "marked";
// 代码高亮
import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    // const hljs = require("highlight.js")
    const language = hljs.getLanguage(lang) ? lang : "vbscript";
    return hljs.highlight(code, { language, ignoreIllegals: true }).value;
  },
  langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});
export default {
  name: "ArticleAll",
  data() {
    return {
      articleData: [],
    };
  },
  computed: {
    articleList() {
      return this.$store.state.article.articleList;
    },
  },
  watch: {
    articleList(newVal) {
      if (newVal) {
        let data = [];
        for (let i = 0; i < newVal.length; i++) {
          let obj = { ...newVal[i], body: marked.parse(newVal[i].body) };
          data.push(obj);
          if (i >= newVal.length - 1) {
            this.articleData = data;
          }
        }
      }
    },
  },
  methods: {
    // 跳转至修改文章路由
    handleEdit(index, row) {
      this.$router.push({
        name: "editart",
        query: {
          _id: row._id,
        },
      });
    },
    // 删除的处理函数
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          if (!this.$store.getters.isAdmin) {
            return this.$message.error("暂无该权限！");
          }
          let result = await this.$API.deleteArticleById(row._id);
          if (result.status == 0) {
            this.$message({
              message: result.message,
              type: "success",
            });
          } else {
            this.$message.error(result.message);
          }
          this.$store.dispatch("getArticles");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.$store.dispatch("getArticles");
  },
};
</script>

<style lang='less' scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.markbody {
  padding: 10px 50px;
  width: 80%;
  max-height: 600px;
  overflow: scroll;
  line-height: 20px !important;
}
.tags {
  padding: 0 3px;
  border-left: 1px solid orangered;
  &:first-child {
    border: 0;
  }
}
</style>