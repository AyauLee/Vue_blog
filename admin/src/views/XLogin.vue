<template>
  <div class="container">
    <div class="main">
      <div class="login">
        <h4>博客后台登录</h4>
        <div class="ipt">
          <i class="el-icon-user-solid"></i>
          <input type="text" v-model.trim="username" v-getfocus />
        </div>
        <div class="ipt">
          <i class="el-icon-lock"></i>
          <input type="password" v-model.trim="password" />
        </div>
        <a href="javascript:;" @click="loginAdmin">登录</a>
        <el-divider><p class="look">浏览账号</p></el-divider>
        <p class="look">用户名：admin &nbsp;密码：admin123</p>
      </div>
    </div>
  </div>
</template>

<script>
import login from "@/api/login";
export default {
  name: "XLogin",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    // 登录
    loginAdmin() {
      if (!this.username || !this.password) {
        return this.$message.error("账号密码不能为空！");
      } else {
        login(this.username, this.password)
          .then((result) => {
            if (result.status == 0) {
              this.$message({ type: "success", message: result.message });
              this.$router.replace("/home");
            } else {
              this.$message.error(result.message);
            }
          })
          .catch(() => {});
      }
    },
    // 点击回车键登录
    keyDown(e) {
      if (e.key === "Enter") {
        this.loginAdmin(); // 定义的登录方法
      }
    },
  },
  mounted() {
    // 绑定监听事件
    window.addEventListener("keydown", this.keyDown);
  },
  beforeDestroy() {
    // 销毁事件
    window.removeEventListener("keydown", this.keyDown);
  },
  directives: {
    getfocus: {
      //指令所在元素被插入页面时
      inserted(element) {
        if (!element.value) {
          element.focus();
        }
      },
    },
  },
};
</script>

<style lang='less' scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-color: #ebedee;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 500px;
  background-color: #2d3a4b;
  .login {
    width: 270px;
    height: 300px;
    h4 {
      padding-bottom: 20px;
      font-weight: 400;
      text-align: center;
      color: #fff;
      font-family: cursive;
    }
    .ipt {
      padding-bottom: 15px;
      i {
        color: #889aa4;
      }
      input {
        margin-left: 10px;
        padding: 0 10px;
        width: 240px;
        height: 30px;
        font-size: 14px;
        color: #ccc;
        background-color: #283443;
        border: 1px solid #3d4856;
        border-radius: 5px;
        outline: none;
        &:focus {
          border: 1px solid #00a4ff;
          outline: none;
        }
      }
    }
    a {
      display: block;
      margin-top: 20px;
      width: 99%;
      height: 30px;
      text-align: center;
      font: 14px/30px cursive;
      background-color: red;
      border-radius: 5px;
    }
    .look {
      font: 12px cursive;
      text-align: center;
      color: #889aa4;
    }
    .el-divider {
      background-color: #889aa4;
      .el-divider__text {
        background-color: #2d3a4b;
      }
    }
  }
}
</style>