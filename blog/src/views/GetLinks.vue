<template>
  <div>
    <MyHeader></MyHeader>
    <div class="links">
      <el-row>
        <el-col
          :xs="{ span: 22, offset: 1 }"
          :sm="{ span: 16, offset: 4 }"
          :md="{ span: 14, offset: 5 }"
          :lg="{ span: 14, offset: 5 }"
          :xl="{ span: 12, offset: 6 }"
        >
          <div class="block">
            <el-timeline>
              <el-timeline-item
                :timestamp="links.cate"
                placement="top"
                v-for="links in linksInfo"
                :key="links.cate"
              >
                <el-card v-for="link in links.docs" :key="link._id">
                  <h3>{{ link.title }}</h3>
                  <p>
                    <a :href="link.url" target="_blank">{{ link.url }}</a>
                  </p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-col>
      </el-row>
    </div>
    <GoTop></GoTop>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import { getLinksInfo } from "@/api";
export default {
  name: "GetLinks",
  data() {
    return {
      linksInfo: [],
    };
  },
  mounted() {
    this.getLinks();
  },
  methods: {
    async getLinks() {
      let data = await getLinksInfo();
      if (data) {
        this.linksInfo = data;
      }
    },
  },
};
</script>

<style lang='less' scoped>
.links {
  min-height: calc(100vh - 160px);
  /deep/.el-timeline-item__timestamp {
    color: #fff;
  }
  .block {
    margin-top: 40px;
    text-align: left;
    .el-card {
      margin-top: 20px;
      a {
        color: purple;
        &:hover {
          color: orangered;
        }
      }
    }
  }
}
</style>