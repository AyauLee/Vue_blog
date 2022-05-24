<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        style="width: 500px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章标签" prop="tags">
          <el-checkbox-group v-model="form.tags">
            <el-checkbox
              v-for="cate in cateList"
              :key="cate"
              :label="cate"
              name="tags"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="发布者" prop="author">
          <el-radio-group v-model="form.author">
            <el-radio label="AyauLee"></el-radio>
            <el-radio label="转载"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="封面图片" prop="cover">
          <el-input v-model="form.cover" placeholder="输入图片链接"></el-input>
        </el-form-item>
        <el-form-item label="文章简介" prop="introduction">
          <el-input type="textarea" v-model="form.introduction"></el-input>
        </el-form-item>
      </el-form>
    </el-card>

    <div id="editor">
      <mavon-editor
        style="height: 100%"
        v-model="body"
        ref="md"
        @imgAdd="$imgAdd"
        @imgDel="$imgDel"
        @save="savebook"
      ></mavon-editor>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "XArticle",
  components: { mavonEditor },
  data() {
    return {
      form: {
        title: "",
        tags: [],
        author: "",
        introduction: "",
        cover: "",
        _id: "",
      },
      rules: {
        title: [{ required: true, message: "请填写文章标题", trigger: "blur" }],
        tags: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个文章标签",
            trigger: "change",
          },
        ],
        author: [
          { required: true, message: "请选择发布者", trigger: "change" },
        ],
        cover: [
          { required: true, message: "请填写封面链接", trigger: "blur" },
          { min: 9, message: "请输入正确的链接地址", trigger: "blur" },
        ],
        introduction: [
          { required: true, message: "请填写文章简介", trigger: "blur" },
          { min: 10, message: "长度在10个字符以上", trigger: "blur" },
        ],
      },
      body: "",
    };
  },
  computed: {
    cateList() {
      return this.$store.getters.cateList;
    },
    articleInfo() {
      return this.$store.state.article.articleInfo;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  watch: {
    articleInfo(newVal) {
      if (newVal) {
        // 将根据id获取的文章写入页面
        for (let k in this.form) {
          this.form[k] = newVal[k];
        }
        this.body = newVal.body;
      }
    },
  },
  mounted() {
    this.$store.dispatch("getArtCateInfo");
    this.$route.query._id &&
      this.$store.dispatch("getArticleInfo", this.$route.query._id);
  },
  methods: {
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      if (!this.isAdmin) return this.$message.error("暂无该权限！");
      // 第一步.将图片上传到服务器.
      let formdata = new FormData();
      formdata.append("image", $file);
      this.$API.uploadImg(formdata).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 详情见本页末尾
        this.$refs.md.$img2Url(pos, url);
      });
    },
    $imgDel(pos) {
      if (!this.isAdmin) return this.$message.error("暂无该权限！");
      this.$API
        .deleteImg(pos[0])
        .then((result) => {
          if (result.status == 0) {
            this.$message({
              message: result.message,
              type: "success",
            });
          } else {
            this.$message.error(result.message);
          }
        })
        .catch(() => {});
    },
    savebook() {
      if (!this.isAdmin) return this.$message.error("暂无该权限！");
      let tags = this.form.tags.join("@");
      let data = { ...this.form, body: this.body, tags };
      this.$refs.form.validate().then(async () => {
        try {
          let result = await this.$store.dispatch("updateArticle", data);
          this.$message({
            message: result,
            type: "success",
          });
          this.$refs.form.resetFields();
          this.body = "";
          if (result == "更新文章成功！") {
            this.$router.push("/article");
          }
        } catch (err) {
          this.$message.error(err);
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
#editor {
  margin: auto;
  width: 100%;
  height: 580px;
}
</style>