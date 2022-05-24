<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#1f2935"
    text-color="#889aa4"
    active-text-color="#3e95fc"
    :collapse="isCollapse"
  >
    <h3>{{ isCollapse ? "后台" : "博客后台管理" }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.path"
      :index="item.path"
      @click="goPage(item.path)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="(list, index) in hasChildren"
      :key="index"
      :index="`${index}`"
    >
      <template slot="title">
        <i :class="`el-icon-${list.icon}`"></i>
        <span slot="title">{{ list.label }}</span>
      </template>
      <el-menu-item-group v-for="item in list.children" :key="item.path">
        <el-menu-item :index="item.path" @click="goPage(item.path)">
          <i :class="`el-icon-${item.icon}`"></i> {{ item.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "XAside",
  data() {
    return {
      // 是否水平折叠收起菜单
      isCollapse: false,
      title: "后台管理系统",
      menu: [
        {
          path: "/home",
          label: "首页",
          icon: "s-home",
        },
        {
          path: "/link",
          label: "链接管理",
          icon: "link",
        },
        {
          path: "/picture",
          label: "照片管理",
          icon: "picture",
        },
        {
          path: "/message",
          label: "查看留言",
          icon: "message",
        },
        {
          path: "/artcate",
          label: "文章分类",
          icon: "collection",
        },
        {
          label: "文章管理",
          icon: "notebook-1",
          children: [
            {
              path: "/article",
              label: "编辑",
              icon: "setting",
            },
            {
              path: "/addart",
              label: "添加",
              icon: "edit-outline",
            },
          ],
        },
        {
          label: "账号相关",
          icon: "s-custom",
          children: [
            {
              path: "/center",
              label: "个人中心",
              icon: "loading",
            },
            {
              path: "/loginout",
              label: "退出登录",
              icon: "switch-button",
            },
          ],
        },
      ],
    };
  },
  computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
  },
  methods: {
    // 点击路由跳转
    goPage(path) {
      if (path == "/loginout") {
        this.$store.commit("LOGINOUT");
        this.$message({ type: "success", message: "已退出！" });
        return this.$router.push("/login");
      }
      this.$router.push(path);
    },
  },
  mounted() {
    this.$bus.$on("handleOpen", () => {
      this.isCollapse = !this.isCollapse;
    });
  },
  beforeDestroy() {
    this.$bus.$off("handleOpen");
  },
};
</script>

<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    height: 40px;
    line-height: 48px;
  }
}
</style>