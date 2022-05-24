<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card style="height: 178px">
          <div class="user">
            <div class="img">
              <img
                v-if="userInfo.avatar"
                :src="userInfo.avatar"
                alt=""
                width="100%"
              />
              <img v-else src="~@/assets/user.jpg" alt="" width="100%" />
            </div>
            <div class="user-title">
              <p>欢迎你，{{ userInfo.nickname || userInfo.username }}</p>
              <p v-if="userInfo.isSuperAdmin">超级管理员(为所欲为)</p>
              <p v-else>普通管理员（仅浏览）</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="statistics">
          <el-card v-for="(item, index) in homeInfo" :key="index">
            <div class="stat_info">
              <h3>{{ item.title }}</h3>
              <p>{{ item.count }}</p>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="padding-top: 20px">
      <el-col :span="14">
        <el-card>
          <div style="height: 350px; width: 100%" ref="lineChart"></div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card>
          <div style="height: 350px; width: 100%" ref="pieChart"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row style="padding-top: 30px">
      <el-col :span="24">
        <el-card>
          <ChinaEcharts />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入 echarts
import * as echarts from "echarts";
import { mapState } from "vuex";
import ChinaEcharts from "@/components/ChinaEcharts";
export default {
  name: "XHome",
  components: { ChinaEcharts },
  computed: {
    ...mapState({
      homeInfo: ({ home }) => home.homeInfo,
      artCateInfo: ({ artcate }) => artcate.artCateInfo,
      userInfo: ({ home }) => home.userInfo,
      artCount: ({ home }) => home.artCount,
    }),
  },
  watch: {
    // 右侧饼图 文章分类概览
    artCateInfo(newVal) {
      if (!(newVal instanceof Array)) {
        return;
      }
      let data = newVal.map((item) => {
        return {
          name: item.catename,
          value: item.count,
        };
      });
      let option = {
        title: {
          text: "文章分类概览",
          x: "center",
          textStyle: {
            fontFamily: "cursive",
          },
        },
        tooltip: {
          trigger: "item",
        },
        color: [
          "#5470c6",
          "#91cc75",
          "#fac858",
          "#ee6666",
          "#73c0de",
          "#3ba272",
          "#fc8452",
          "#9a60b4",
          "#ea7ccc",
        ],
        series: [
          {
            type: "pie",
            data,
            top: "10%",
          },
        ],
      };
      echarts.init(this.$refs.pieChart).setOption(option);
    },
    // 左侧折线图 创作字数统计
    artCount(newVal) {
      if (!(newVal instanceof Array)) {
        return;
      }
      let xArr = newVal.map((item) => item.timecate);
      let sArr = newVal.map((item) => item.count);
      let option = {
        title: {
          text: "创作字数统计",
          x: "center",
          textStyle: {
            fontFamily: "cursive",
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xArr,
        },
        yAxis: {},
        series: [
          {
            data: sArr,
            type: "line",

            label: {
              show: true,
              position: "top",
              fontSize: 14,
            },
            lineStyle: {
              color: "#8da2e4",
              width: 4,
              type: "solid",
            },
            itemStyle: {
              color: "purple",
            },
            areaStyle: {
              color: "#8da2e4",
              opacity: 0.5,
            },
          },
        ],
      };
      echarts.init(this.$refs.lineChart).setOption(option);
    },
  },
  mounted() {
    this.$store.dispatch("getArtCateInfo");
    this.$store.dispatch("getHomeInfo");
    this.$store.dispatch("getArtCount");
  },
};
</script>

<style lang='less' scoped>
.user {
  display: flex;
  .img {
    flex: 2;
    img {
      border-radius: 50%;
    }
  }
  .user-title {
    flex: 3;
    padding-left: 20px;
  }
}
.statistics {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .el-card {
    width: 32%;
    height: 84px;
    &:nth-child(-n + 3) {
      margin-bottom: 10px;
    }
    /deep/.el-card__body {
      padding: 10px;
    }
    .stat_info {
      text-align: center;
      h3,
      p {
        margin: 0;
      }
      h3 {
        padding-bottom: 14px;
        color: #999;
      }
    }
  }
}
</style>