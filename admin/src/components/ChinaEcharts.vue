<template>
  <div class="chinaecharts">
    <div id="mapChart" ref="mapChart"></div>
  </div>
</template>
<script>
// 引入 echarts
import * as echarts from "echarts";
import "echarts/map/js/china";
export default {
  name: "ChinaEcharts",
  computed: {
    areaData() {
      return this.$store.state.home.areaData;
    },
  },
  methods: {
    mapFn(data) {
      // 基于准备好的dom，初始化echarts实例
      var mapChart = echarts.init(this.$refs.mapChart);
      //   var mapChart = this.$echarts.init(document.getElementById("mapChart"));
      mapChart.setOption({
        backgroundColor: "", //背景颜色
        title: {
          text: "访问量分布",
          subtext: "",
          color: "#fff",
          x: "center",
          textStyle: {
            fontFamily: "cursive",
          },
        },
        //是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
        visualMap: {
          // 左下角定义 在选中范围中的视觉元素 渐变地区颜色
          type: "piecewise", // 类型为分段型
          top: "bottom",
          // calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
          right: 10,
          splitNumber: 6,
          seriesIndex: [0],
          itemWidth: 20, // 每个图元的宽度
          itemGap: 2, // 每两个图元之间的间隔距离，单位为px
          pieces: [
            // 自定义每一段的范围，以及每一段的文字
            { gte: 1000, label: "1000人以上", color: "#e1251a" }, // 不指定 max，表示 max 为无限大（Infinity）。
            {
              gte: 500,
              lte: 999,
              label: "500-999人",
              color: "orange",
            },
            {
              gte: 100,
              lte: 499,
              label: "100-499人",
              color: "#ffeb3bc2",
            },
            {
              gte: 11,
              lte: 99,
              label: "11-99人",
              color: "#8bc34aa8",
            },
            {
              gte: 1,
              lte: 10,
              label: "1-10人",
              color: "#E6F1FF",
            },
            { lte: 0, label: "无", color: "#FAFAFA" }, // 不指定 min，表示 min 为无限大（-Infinity）。
          ],
          textStyle: {
            color: "#737373",
          },
        },
        // 提示框，鼠标移入
        tooltip: {
          show: true, //鼠标移入是否触发数据
          trigger: "item", //出发方式
          formatter: "{b}-访问数量：{c}",
        },
        //配置地图的数据，并且显示
        series: [
          {
            name: "地图",
            type: "map", //地图种类
            map: "china", //地图类型。
            data, // 后端返回的展示数据
            itemStyle: {
              normal: {
                label: {
                  show: true, //默认是否显示省份名称
                },
                areaStyle: {
                  color: "#FAFAFA", //默认的地图板块颜色
                },
                borderWidth: 1,
                borderColor: "#D9D9D9", // D9D9D9
              },
              //地图区域的多边形 图形样式。
              emphasis: {
                label: {
                  show: true, //选中状态是否显示省份名称
                },
                areaStyle: {
                  color: "#90c31d", //选中状态的地图板块颜色
                },
              },
            },
            zoom: 1.2, //放大比例
            label: {
              //图形上的文本标签，可用于说明图形的一些数据信息
              show: true,
            },
          },
          {
            type: "scatter",
            showEffectOn: "render", //配置什么时候显示特效
            coordinateSystem: "geo", //该系列使用的坐标系
            symbolSize: 10, //标记的大小
            data: [{ name: "宜昌", value: [111.3, 30.7, 130] }],
            // data: [{ name: "广州", value: [113.5107, 23.2196] }],
            zlevel: 99999,
          },
        ],
      }),
        window.addEventListener("resize", () => {
          // 自动渲染echarts
          mapChart.resize();
        });
    },
  },
  watch: {
    areaData(newVal) {
      this.mapFn(newVal);
    },
  },
  mounted() {
    this.$store.dispatch("getAreaData");
  },
};
</script>
<style scoped>
.chinaecharts {
  width: 100%;
  height: 500px;
}
#mapChart {
  width: 100%;
  height: 500px;
}
</style>

