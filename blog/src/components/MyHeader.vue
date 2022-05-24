<template>
  <div class="header">
    <div class="header_son" ref="header">
      <el-row>
        <el-col :xs="8" :sm="4" :md="4" :lg="6" :xl="4">
          <div class="content logo" @click="$router.push('/')">AyauLee</div>
        </el-col>
        <el-col
          :xs="0"
          :sm="{ span: 12, offset: 2 }"
          :md="{ span: 10, offset: 3 }"
          :lg="{ span: 10, offset: 1 }"
          :xl="{ span: 8, offset: 4 }"
        >
          <div class="content hidden-xs-only">
            <ul class="nav">
              <li v-for="nav in navs" :key="nav.to">
                <router-link :to="nav.to">{{ nav.name }}</router-link>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col
          :xs="{ span: 10, offset: 6 }"
          :sm="{ span: 4, offset: 2 }"
          :md="{ span: 4, offset: 3 }"
          :lg="{ span: 4, offset: 3 }"
          :xl="{ span: 3, offset: 5 }"
          class="menubar"
        >
          <div class="content">
            <!-- 导航下拉菜单 仅超小屏幕展示 -->
            <el-dropdown trigger="click" placement="bottom-start">
              <span class="el-dropdown-link">
                <a
                  href="javascript:;"
                  class="el-icon-s-unfold hidden-sm-and-up"
                ></a>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :icon="nav.icon"
                  v-for="nav in navs"
                  :key="nav.to"
                >
                  <router-link :to="nav.to" style="color: #000">{{
                    nav.name
                  }}</router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <!-- 邮件图标 -->
            <a
              href="javascript:;"
              class="el-icon-message"
              @click="dialogFormVisible = true"
            ></a>
            <!-- 邮件Diglog对话框 -->
            <el-dialog
              :visible.sync="dialogFormVisible"
              append-to-body
              width="350px"
              class="font-xk"
              center
              :before-close="handleClose"
            >
              <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="70px"
                class="demo-ruleForm"
                size="mini"
              >
                <el-form-item label="昵称" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                  <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                  <el-col :span="12">
                    <el-input
                      v-model.number="form.code"
                      maxlength="6"
                    ></el-input>
                  </el-col>
                  <el-col :span="12">
                    <div class="getcode">
                      <el-button v-if="date == 60" @click="getCode"
                        >获取验证码</el-button
                      >
                      <el-button v-else disabled type="info"
                        >{{ date }} s</el-button
                      >
                    </div>
                  </el-col>
                </el-form-item>
                <el-form-item label="留言" prop="message">
                  <el-input type="textarea" v-model="form.message"></el-input>
                </el-form-item>
              </el-form>

              <div slot="title" class="dialog-title title">
                <h3>联系我</h3>
                <p style="text-indent: 0">关于留言：</p>
                <p>如果您对该网站有一些建议、意见或者其他，非常欢迎留言！</p>
                <p>留言请务必和谐、友善！禁止发表不当言论！</p>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="postForm">发送</el-button>
              </div>
            </el-dialog>

            <!-- 菜单图标  -->
            <a
              href="javascript:;"
              class="el-icon-menu"
              @click="drawer = true"
            ></a>
            <!-- 菜单图标的抽屉 -->
            <el-drawer
              :visible.sync="drawer"
              direction="rtl"
              append-to-body
              :size="350"
              class="r-drawer"
            >
              <!-- 文章 -->
              <div class="zun article font-xk clearfix">
                <p>
                  古之善为道者，微妙玄通，深不可识。夫不唯不可识，故强为之容；
                </p>
                <p>
                  豫兮若冬涉川；犹兮若畏四邻；俨兮其若客；涣兮其若凌释；敦兮其若朴；旷兮其若谷；混兮其若浊；
                </p>
                <p>
                  孰能浊以静之徐清？孰能安以静之徐生？保此道者，不欲盈。夫唯不盈，故能蔽而新成。
                </p>
                <p class="author">--摘自《道德经》</p>
              </div>
              <!-- 日历  -->
              <div class="zun clearfix">
                <el-calendar>
                  <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
                  <template slot="dateCell" slot-scope="{ data }">
                    <p :class="data.isSelected ? 'is-selected' : ''">
                      {{ data.day.split("-").slice(2).join() }}
                    </p>
                  </template>
                </el-calendar>
              </div>
            </el-drawer>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getEmailCode, postMessage } from "@/api";
import * as sysTool from "@/assets/js/systemTool"; // 浏览器及操作系统
export default {
  name: "MyHeader",
  data() {
    let checkCode = (rule, value, callback) => {
      if ((value + "").length < 6) {
        return callback(new Error("请输入六位验证码"));
      } else {
        return callback();
      }
    };
    return {
      navs: [
        { to: "/", name: "Home", icon: "el-icon-s-home" },
        { to: "/archive", name: "Archive", icon: "el-icon-collection" },
        { to: "/picture", name: "Picture", icon: "el-icon-picture" },
        { to: "/link", name: "Link", icon: "el-icon-link" },
        { to: "/about", name: "About", icon: "el-icon-info" },
      ],
      // 控制建议表单是否显示
      dialogFormVisible: false,
      form: {
        name: "",
        email: "",
        code: "",
        message: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: ["blur", "change"],
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { type: "number", message: "验证码为数字类型", trigger: "change" },
          { validator: checkCode, trigger: "blur" },
        ],
        message: [{ required: true, message: "请填写留言", trigger: "blur" }],
      },
      date: 60, // 倒计时
      timer: null,
      // 右侧抽屉
      drawer: false,
    };
  },
  watch: {
    // 控制头部导航定位
    currScroll(newVal) {
      if (newVal > 0) {
        this.$refs.header.style.position = "fixed";
      } else {
        this.$refs.header.style.position = "static";
      }
    },
  },
  methods: {
    // 关闭dialog前的回调
    handleClose(done) {
      this.$confirm("确认关闭？", { customClass: "focus_message" })
        .then(() => {
          this.$refs.form.resetFields();
          done();
        })
        .catch(() => {});
    },
    // 获取验证码
    getCode() {
      this.$refs.form.validateField("email", async (err) => {
        if (err) {
          return this.$message.error("邮箱不对雀食发不了~");
        } else {
          let result = await getEmailCode(this.form.email);
          if (result.status == 0) {
            this.$message({
              message: "验证码已发送，请注意查收！",
              type: "success",
            });
          } else {
            this.$message.error("哎呀出错啦，请稍后再试！");
          }
          this.timer = setInterval(() => {
            if (this.date < 1) {
              clearInterval(this.timer);
              this.timer = null;
              this.date = 60;
            } else {
              this.date--;
            }
          }, 1000);
        }
      });
    },
    // 点击发送的处理函数
    async postForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          this.$message.error("请确认信息填写无误！");
        } else {
          let ip = sessionStorage.getItem("ip");
          let area = sessionStorage.getItem("area");
          let brower = sysTool.GetCurrentBrowser();
          let os = sysTool.GetOs();
          let data = { ...this.form, ip, area, brower, os };
          postMessage(data)
            .then((result) => {
              if (result.status == 0) {
                this.$message({ message: result.message, type: "success" });
                this.$refs.form.resetFields();
                this.dialogFormVisible = false;
              } else {
                this.$message({ message: result.message, type: "warning" });
              }
            })
            .catch(() => {
              this.$message.error("出错了噢~");
            });
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
a {
  color: #fff;
  &:hover {
    color: orangered;
  }
}
.header {
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
}
.header_son {
  width: 100%;
  background-color: #000;
  opacity: 0.8;
  z-index: 999;
  .content {
    border-radius: 4px;
    min-height: 60px;
    line-height: 60px;
    font-family: "Brush Script MT", Arial, Helvetica, sans-serif;
  }
  .logo {
    font-size: 30px;
    cursor: pointer;
    &:hover {
      color: orangered;
    }
  }

  .nav {
    display: flex;
    justify-content: space-around;
    font-size: 22px;
  }

  .menubar {
    a {
      font-size: 20px;
      padding: 0 10px;
    }
  }
}
.title {
  h3 {
    padding-bottom: 20px;
  }
  p {
    text-align: left;
    text-indent: 2em;
    line-height: 1.5;
    font-size: 14px;
  }
}
/deep/.el-dialog__body {
  padding: 20px 25px 10px !important;
}
.getcode {
  padding-left: 20px;
  .el-button {
    width: 100%;
    padding: 12px 10px;
  }
}
</style>
<style lang="less">
.r-drawer {
  top: 60px;
  overflow-y: scroll;
  .el-drawer__header {
    margin: 0;
    padding: 0;
    // margin-bottom: 10px;
    background-color: #000;
    .el-dialog__close {
      position: absolute;
      top: 0;
      left: 0;
      color: red;
    }
  }
  .el-drawer__body {
    background-color: orange;
    padding: 25px 25px 0;
  }
  .zun {
    width: 100%;
    height: 46%;
    padding-top: 1px;
    margin-bottom: 25px;
    background-color: #fff;
    &.article {
      padding: 20px;
      p {
        text-indent: 2em;
        line-height: 1.5;
        &.author {
          padding-top: 20px;
          text-align: right;
        }
      }
    }
    .el-calendar {
      width: 100%;
      .el-calendar__header {
        font-size: 16px;
        .el-button-group {
          display: flex;
          .el-button {
            padding: 5px;
          }
        }
      }
      .el-calendar__body {
        padding: 0 20px;
        // 日历表格
        .el-calendar-table {
          font-size: 12px;
          thead th {
            padding: 5px;
          }
          .el-calendar-day {
            height: 30px;
          }
        }
      }
      .is-selected {
        color: aqua;
      }
    }
  }
}
.focus_message {
  width: 350px !important;
}
</style>