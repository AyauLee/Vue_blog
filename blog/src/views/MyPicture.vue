<template>
  <div>
    <MyHeader></MyHeader>
    <div class="picture">
      <el-row>
        <el-col
          :xs="{ span: 22, offset: 1 }"
          :sm="{ span: 16, offset: 4 }"
          :md="{ span: 14, offset: 5 }"
          :lg="{ span: 14, offset: 5 }"
          :xl="{ span: 14, offset: 5 }"
        >
          <el-card
            v-for="pic in picInfo.data"
            :key="pic._id"
            style="margin-bottom: 20px"
          >
            <div class="demo-image__lazy">
              <el-image
                :src="pic.url"
                :title="pic.title"
                lazy
                :preview-src-list="urls"
                fit="cover"
                style="width: 100%; height: 100%"
              >
              </el-image>
            </div>
          </el-card>
          <div v-show="urls.length > 0" style="padding-top: 20px">
            <!-- 分页器  total:总条数 pageNo:当前页 totalPages:总页数-->
            <PagiNation
              :total="picInfo.total"
              :totalPages="picInfo.totalPages"
              :pageNo="picInfo.pageNo"
              @goPageNo="goPageNo"
            ></PagiNation>
          </div>
        </el-col>
      </el-row>
    </div>
    <GoTop></GoTop>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import { getPicInfo } from "@/api";
import PagiNation from "@/components/PagiNation";
export default {
  name: "MyPicture",
  components: { PagiNation },
  data() {
    return {
      picInfo: {},
    };
  },
  computed: {
    urls() {
      let urlarr = [];
      this.picInfo.data &&
        this.picInfo.data.forEach((item) => {
          urlarr.push(item.url);
        });
      return urlarr;
    },
  },
  methods: {
    async getData(pageNum) {
      let data = await getPicInfo(pageNum);
      if (data) {
        this.picInfo = data;
      }
    },
    goPageNo(pageNum) {
      document.documentElement.scrollTop = 0;
      this.getData(pageNum);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang='less' scoped>
.picture {
  width: 100%;
  min-height: calc(100vh - 160px);
}
</style>