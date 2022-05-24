<template>
  <header class="header">
    <div class="l-content">
      <el-button
        plain
        size="mini"
        icon="el-icon-menu"
        @click="$bus.$emit('handleOpen')"
      >
      </el-button>
    </div>

    <div
      class="strive"
      v-for="(item, index) in strive"
      :key="index"
      v-show="showIndex == index"
    >
      <transition name="fade">
        <h3 v-show="showIndex == index">{{ item }}</h3>
      </transition>
    </div>

    <div class="r-content">
      <el-dropdown
        trigger="click"
        size="mini"
        placement="bottom"
        @command="handleCommand"
      >
        <span class="el-dropdown-link">
          <img v-if="userimg" :src="userimg" />
          <img v-else src="../assets/user.jpg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="center">个人中心</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: "XHeader",
  data() {
    return {
      strive: [
        "及时当勉励，岁月不待人",
        "苔花如米小，也学牡丹开",
        "博观而约取，厚积而薄发",
        "志不强者智不达，言不信者行不果",
        "千淘万漉虽辛苦，吹尽狂沙始到金",
        "千磨万击还坚劲，任尔东西南北风",
        "长风破浪会有时，直挂云帆济沧海",
        "杜鹃再拜忧天泪，精卫无穷填海心",
        "时人不识凌云木，直待凌云始道高",
      ],
      showIndex: 0,
      timer: null,
    };
  },
  computed: {
    userimg() {
      return this.$store.state.home.userInfo.avatar;
    },
  },
  methods: {
    openTimer() {
      this.timer = setInterval(() => {
        if (this.showIndex >= 8) {
          this.showIndex = 0;
        } else {
          this.showIndex++;
        }
      }, 30000);
    },
    handleCommand(command) {
      if (command == "exit") {
        this.$store.commit("LOGINOUT");
        this.$message({ type: "success", message: "已退出！" });
        this.$router.push("/login");
      }
      if (command == "center") {
        this.$router.push("/center");
      }
    },
  },
  mounted() {
    this.openTimer();
    this.$store.dispatch("getUserInfo");
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style lang='less' scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  .strive {
    flex: 1;
    margin: 0 20px;
    h3 {
      text-align: center;
      color: #fff;
    }
  }
  .r-content {
    padding-right: 20px;
    .el-dropdown {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>