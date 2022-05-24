<template>
  <div>
    <MyHeader></MyHeader>
    <el-row :gutter="10">
      <el-col
        :xs="{ span: 22, offset: 1 }"
        :sm="{ span: 20, offset: 2 }"
        :md="{ span: 18, offset: 3 }"
        :lg="{ span: 16, offset: 4 }"
        :xl="{ span: 16, offset: 4 }"
      >
        <div class="archive">
          <el-card>
            <MyTags></MyTags>
          </el-card>

          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
    <GoTop></GoTop>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
export default {
  name: "MyArchive",
};
</script>

<style lang='less' scoped>
.archive {
  min-height: calc(100vh - 160px);
}
.bg-black {
  padding: 20px 0;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 30px;
}
</style>