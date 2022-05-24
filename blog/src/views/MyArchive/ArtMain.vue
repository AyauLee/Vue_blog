<template>
  <div class="artmain">
    <el-card>
      <div class="title">
        <h1>{{ artmain.title }}</h1>
        <div class="tags">
          <ul>
            <li class="el-icon-collection-tag"></li>
            <li v-for="tag in artmain.tags" :key="tag">{{ tag }}</li>
          </ul>
        </div>
      </div>
      <div class="markbody" v-html="artbody"></div>
      <h6 class="posted">
        发布者：{{ artmain.author }} 时间：{{ artmain.date }}
      </h6>
    </el-card>
  </div>
</template>

<script>
// marked
import { marked } from "marked";
// 代码高亮
import "highlight.js/styles/github-dark.css";

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const hljs = require("highlight.js");
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
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
  name: "ArtMain",
  data() {
    return {
      artbody: "",
    };
  },
  mounted() {
    this.$store.dispatch("articleById", this.$route.query.id);
  },
  computed: {
    artmain() {
      return this.$store.state.article.artmain;
    },
  },
  watch: {
    artmain(newVal) {
      if (newVal) {
        this.artbody = marked.parse(newVal.body);
      }
    },
  },
};
</script>

<style lang='less' scoped>
.artmain {
  margin-top: 30px;
  text-align: left;
  .posted {
    padding: 30px 20px 0 0;
    text-indent: none;
    text-align: right;
  }
}
/deep/.el-card {
  padding: 20px 0;
  .title {
    text-align: center;
    padding-bottom: 20px;
    .tags {
      ul {
        display: flex;
        justify-content: center;
        li {
          padding: 0 10px;
          border-left: 1px solid #ccc;
          &:first-child {
            font-size: 20px;
            padding: 0;
            color: orangered;
          }
          &:nth-child(-n + 2) {
            border: 0;
          }
        }
      }
    }
  }
  .markbody {
    p {
      padding: 5px 0;
      text-indent: 2em;
      font-size: 16px;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      padding: 10px 0;
    }
    ul,
    ol,
    li {
      margin-left: 20px;
      list-style-type: disc;
      list-style-position: inside;
      font-size: 14px;
    }
    pre {
      padding: 0 10px;
    }
  }
}
</style>