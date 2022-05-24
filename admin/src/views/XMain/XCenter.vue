<template>
  <div class="mycenter">
    <el-card>
      <div style="display: flex">
        <div style="flex: 2">
          <h3>更换头像</h3>
          <el-upload
            class="avatar-uploader"
            action=""
            drag
            :show-file-list="false"
            :http-request="httpUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" width="100%" />
            <img
              v-if="!imageUrl && userInfo.avatar"
              :src="userInfo.avatar"
              width="100%"
            />
            <i
              v-if="!userInfo.avatar && !imageUrl"
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
          <el-button
            icon="el-icon-zoom-in"
            size="mini"
            :disabled="!imageUrl && !userInfo.avatar"
            @click="innerShow = true"
            >预览</el-button
          >
        </div>
        <div style="flex: 5; padding: 0 30px">
          <h3>修改信息^_^</h3>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="昵称" style="width: 300px">
              <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
                <el-radio label="其他"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button @click="onbyby">取消</el-button>
              <el-button type="primary" @click="onSubmit">确定修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-dialog width="40%" :visible.sync="innerShow" append-to-body>
        <img v-if="imageUrl" :src="imageUrl" alt="" width="100%" />
        <img v-else :src="userInfo.avatar" alt="" width="100%" />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "XCenter",
  data() {
    return {
      innerShow: false,
      imageUrl: "",
      form: {
        nickname: "",
        gender: "",
      },
      rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" },
        ],
        gender: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个性别",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.home.userInfo;
    },
  },
  watch: {
    userInfo: {
      immediate: true,
      handler(newVal) {
        for (let k in this.form) {
          this.form[k] = newVal[k];
        }
      },
    },
  },
  methods: {
    // 自定义上传图片
    async httpUpload({ file }) {
      // this.handleStorage();
      // 将图片上传到服务器.
      let formdata = new FormData();
      formdata.append("image", file);
      let newurl = await this.$API.uploadImg(formdata);
      if (newurl) {
        this.imageUrl = newurl;
        let { _id, avatar } = this.userInfo;
        this.$API.updateAvatar(_id, avatar, newurl).then((result) => {
          if (result.status == 0) {
            this.$message({ type: "success", message: result.message });
            this.$store.dispatch("getUserInfo");
          } else {
            this.$message.error(result.message);
          }
        });
      }
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let data = { ...this.form, _id: this.userInfo._id };
          this.$API.updateUserInfo(data).then((result) => {
            if (result.status == 0) {
              this.$message({ type: "success", message: result.message });
              this.$store.dispatch("getUserInfo");
              this.$router.push("/home");
            } else {
              this.$message.error(result.message);
            }
          });
        } else {
          return false;
        }
      });
    },
    onbyby() {
      this.$refs.form.resetFields();
      this.$router.push("/home");
    },
  },
};
</script>

<style lang='less' scoped>
@upload: 150px;
.mycenter {
  position: relative;
  width: 100%;
  height: 100%;
  .el-card {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-60%);
    width: 600px;
    h3 {
      text-align: center;
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