<template>
  <div>
    <div class="picture">
      <el-card v-for="item in picInfo.data" :key="item._id">
        <div>
          <el-image
            style="width: 100%; height: 200px"
            :src="item.url"
            :title="item.title"
            :preview-src-list="urls"
            fit="cover"
            lazy
          >
          </el-image>
          <div class="edit">
            <el-dropdown trigger="click" size="small" placement="top">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <i class="el-icon-delete fs16" @click="deletePic(item)"></i>
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="el-icon-plus fs16" @click="dialogShow = true"></i>
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="el-icon-edit fs16" @click="picEdit(item)"></i>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-card>

      <el-dialog
        :title="form._id ? '更新图片信息' : '新增图片信息'"
        :visible.sync="dialogShow"
        width="30%"
        :before-close="handleClose"
      >
        <div class="handle">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="图片分类">
              <el-select v-model="form.cate" placeholder="请选择分类">
                <el-option label="风景" value="风景"></el-option>
                <el-option label="人物" value="人物"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="提示信息">
              <el-input v-model="form.title" style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item label="选择图片">
              <div class="look">
                <el-upload
                  class="avatar-uploader"
                  action=""
                  drag
                  :show-file-list="false"
                  :http-request="httpUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <img v-if="!imageUrl && form.url" :src="form.url" />
                  <i
                    v-if="!form.url && !imageUrl"
                    class="el-icon-plus avatar-uploader-icon"
                  ></i>
                </el-upload>
                <el-button
                  icon="el-icon-zoom-in"
                  size="mini"
                  :disabled="!imageUrl && !form.url"
                  @click="innerShow = true"
                  >预览</el-button
                >
              </div>
            </el-form-item>
          </el-form>
        </div>
        <el-dialog width="40%" :visible.sync="innerShow" append-to-body>
          <img v-if="imageUrl" :src="imageUrl" alt="" width="100%" />
          <img v-else :src="form.url" alt="" width="100%" />
        </el-dialog>

        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submitData">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 分页器  total:总条数 pageNo:当前页 totalPages:总页数-->
    <div v-show="picInfo.totalPages > 1">
      <PagiNation
        :total="picInfo.total"
        :totalPages="picInfo.totalPages"
        :pageNo="picInfo.pageNo"
        @goPageNo="goPageNo"
      ></PagiNation>
    </div>
  </div>
</template>

<script>
import PagiNation from "@/components/PagiNation";
export default {
  name: "XPicture",
  components: { PagiNation },
  data() {
    return {
      dialogShow: false,
      innerShow: false,
      picInfo: {},
      form: {
        cate: "",
        title: "",
        url: "",
        _id: "",
      },
      imageUrl: "",
    };
  },
  computed: {
    urls() {
      return this.picInfo.data.map((item) => item.url);
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    async getData(pageNum) {
      this.picInfo = await this.$API.getPicInfo(pageNum);
    },
    goPageNo(pageNum) {
      document.documentElement.scrollTop = 0;
      this.getData(pageNum);
    },
    // 关闭diglog
    handleClose() {
      this.$confirm("确认关闭？")
        .then(() => {
          this.handleStorage();
          this.clearImgurl();
          this.dialogShow = false;
          this.clearForm();
        })
        .catch(() => {});
    },
    // 点击编辑图片的处理函数
    picEdit(picItem) {
      for (let k in this.form) {
        this.form[k] = picItem[k];
      }
      this.dialogShow = true;
    },
    // 删除之前已上传图片
    handleStorage() {
      let storageIMG = sessionStorage.getItem("IMAGEURL");
      // 如果已上传图片，先删除  通过会话存储解决页面刷新把imageUrl数据刷新没了导致无法删除之前存入服务器的图片
      if (storageIMG) {
        this.$API.deleteImg(storageIMG);
      } else if (this.imageUrl) {
        this.$API.deleteImg(this.imageUrl);
      }
    },
    // 清除imgUrl数据
    clearImgurl() {
      let storageImg = sessionStorage.getItem("IMAGEURL");
      storageImg && sessionStorage.removeItem("IMAGEURL");
      this.imageUrl = "";
    },
    // 清空表单数据
    clearForm() {
      for (let k in this.form) {
        this.form[k] = "";
      }
    },
    // 自定义上传图片
    httpUpload({ file }) {
      if (!this.isAdmin) return this.$message.error("暂无该权限！");
      this.handleStorage();
      // 将图片上传到服务器.
      let formdata = new FormData();
      formdata.append("image", file);
      this.$API.uploadImg(formdata).then((url) => {
        this.imageUrl = url;
        sessionStorage.setItem("IMAGEURL", url);
      });
    },
    // 提交表单更新图片信息
    submitData() {
      if (!this.isAdmin) return this.$message.error("暂无该权限！");
      if (this.imageUrl) {
        if (this.form.url) {
          this.$API.deleteImg(this.form.url);
        }
        this.form.url = this.imageUrl;
      }
      if (!this.form.url) {
        return this.$message("请选择图片！");
      }
      let data = { ...this.form };
      this.$API
        .updatePicInfo(data)
        .then(({ message }) => {
          this.$message({ message, type: "success" });
          this.clearForm();
          this.clearImgurl();
          this.dialogShow = false;
          this.getData();
        })
        .catch(({ message }) => {
          this.$message.error(message);
          if (message == "信息无修改！") {
            this.clearImgurl();
            this.getData();
          }
        });
    },
    // 根据id删除图片信息
    deletePic(item) {
      if (!this.isAdmin) return this.$message.error("暂无该权限！");
      this.$API
        .deletePicInfo(item._id)
        .then((result) => {
          this.$message({ message: result.message, type: "success" });
          this.$API.deleteImg(item.url);
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
      this.getData();
    },
  },
  mounted() {
    this.getData();
    this.handleStorage();
    this.clearImgurl();
  },
  beforeDestroy() {
    this.$off("goPageNo");
  },
};
</script>

<style lang='less' scoped>
@upload: 100px;
.fs16 {
  font-size: 16px;
}
.picture {
  min-height: 80vh;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  .el-card {
    width: 31%;
    height: 300px;
    margin-bottom: 20px;
    box-sizing: border-box;
    .edit {
      padding-top: 50px;
      display: flex;
      flex-direction: row-reverse;
    }
  }
  .look {
    display: flex;
    align-items: flex-end;
    .el-button {
      margin-left: 20px;
    }
  }
  .avatar-uploader {
    width: @upload+2px;
    height: @upload+2px;
    border: 1px dashed #ccc;
    .el-upload {
      cursor: pointer;
      &:hover {
        border-color: #409eff;
      }
    }
  }
  /deep/.el-upload-dragger {
    width: @upload;
    height: @upload;
    border: 0;
    border-radius: 0;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: @upload;
    height: @upload;
    line-height: @upload;
    text-align: center;
  }
  .avatar {
    width: @upload;
    height: @upload;
    display: block;
  }
}
</style>