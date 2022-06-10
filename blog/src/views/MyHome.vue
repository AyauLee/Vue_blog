<template>
  <div>
    <MyHeader></MyHeader>
    <div class="home">
      <el-row :gutter="30">
        <el-col
          :xs="{ span: 22, offset: 1 }"
          :sm="{ span: 22, offset: 1 }"
          :md="{ span: 13, offset: 1 }"
          :lg="{ span: 13, offset: 2 }"
          :xl="{ span: 12, offset: 3 }"
        >
          <!-- 轮播图 -->
          <div class="bg-dark hidden-xs-only">
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in List" :key="item.id">
                <img :src="item.imgUrl" width="100%" />
              </el-carousel-item>
            </el-carousel>
          </div>

          <!-- 文章列表 -->
          <div class="article">
            <!-- pc端 -->
            <ul class="hidden-sm-and-down show_pc">
              <li
                ref="artshow"
                class="bg-dark"
                v-for="(item, index) in newArtList"
                :key="item._id"
                :class="{
                  flex_l: index % 2 == 0,
                  flex_r: index % 2 != 0,
                  test: true,
                  testenter: artshows.length > 0 && artshows[index].artshow,
                }"
              >
                <div class="imgbox">
                  <img :src="item.cover" width="100%" />
                </div>
                <div class="content" @click="goArticle(item._id)">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.introduction }}</p>
                  <p>{{ item.date }} {{ item.author }}</p>
                </div>
              </li>
            </ul>

            <!-- 移动端 -->
            <ul class="hidden-md-and-up show_phone">
              <li><h2>最新发布</h2></li>
              <li v-for="item in newArtList" :key="item._id">
                <div class="content_p" @click="goArticle(item._id)">
                  <h3>{{ item.title }}</h3>
                  <h6>{{ item.date }} {{ item.author }}</h6>
                  <p>{{ item.introduction }}</p>
                </div>
              </li>
              <li>
                <div class="content_p">
                  <router-link to="/archive" class="gogo"
                    >查看更多...</router-link
                  >
                </div>
              </li>
            </ul>
          </div>
        </el-col>

        <!-- 右侧 -->
        <el-col :md="9" :lg="7" :xl="6" class="hidden-sm-and-down">
          <!-- 客至 -->
          <div class="bg-dark" :class="{ test: true, testenter: getshow }">
            <div class="c_gray hello">
              <h2>客至</h2>
              <p>杜甫</p>
              <p>舍南舍北皆春水，但见群鸥日日来。</p>
              <p>花径不曾缘客扫，蓬门今始为君开。</p>
              <p>盘飧市远无兼味，樽酒家贫只旧醅。</p>
              <p>肯与邻翁相对饮，隔篱呼取尽余杯。</p>
            </div>
          </div>

          <!-- 最新发布文章 -->
          <div
            class="bg-dark"
            :class="{ test: true, testenter: shows.show_1 }"
            ref="show1"
          >
            <div class="c_gray hello">
              <h2 class="font-mt">Publish Recently</h2>
              <ul class="newArt">
                <li
                  v-for="item in newArtList"
                  :key="item._id"
                  @click="goArticle(item._id)"
                >
                  <h3>
                    <router-link to="/archive" class="c_gray">{{
                      item.title
                    }}</router-link>
                  </h3>
                  <p class="font-mt">{{ item.date }}</p>
                </li>
              </ul>
            </div>
          </div>

          <!-- 标签区域 -->
          <div
            ref="show2"
            class="bg-dark"
            :class="{ test: true, testenter: shows.show_2 }"
          >
            <MyTags></MyTags>
          </div>

          <!-- 尊龙 -->
          <div
            class="tags bg-dark c-gray"
            :class="{ test: true, testenter: shows.show_3 }"
            ref="show3"
          >
            <img
              src="https://gss0.baidu.com/70cFfyinKgQFm2e88IuM_a/baike/pic/item/cdbf6c81800a19d8b51e240e3dfa828ba61e469f.jpg"
              width="100%"
            />
            <p style="color: #666; padding-top: 30px">其实尊龙只比我帅亿点点</p>
          </div>

          <div
            class="tags bg-dark"
            :class="{ test: true, testenter: shows.show_4 }"
            ref="show4"
          >
            <router-link to="/archive">查看全部文章</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <GoTop></GoTop>

    <MyFooter></MyFooter>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MyHome",
  data() {
    return {
      getshow: false,
      shows: {
        show_1: false,
        show_2: false,
        show_3: false,
        show_4: false,
        // art1: false,
      },
      artshows: [],
      List: [
        {
          imgUrl:
            "https://server.letxi.cn/uploads/2a6e096c5f5c5cb4b24cc5b405687647",
          id: 1,
        },
        {
          imgUrl:
            "https://server.letxi.cn/uploads/9330d998c81b05ea9558b19cd5d8ed33",
          id: 2,
        },
        {
          imgUrl:
            "https://server.letxi.cn/uploads/b0f94df8f41e79926081789c3cfdb87a",
          id: 3,
        },
        {
          imgUrl:
            "https://server.letxi.cn/uploads/aa39a865186e82ab1df2117f448a19ec",
          id: 4,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      newArtList: (state) => state.article.newArtList,
    }),
  },
  watch: {
    currScroll() {
      this.shows.show_1 = this.handleScroll(this.$refs.show1, "show_1");
      this.shows.show_2 = this.handleScroll(this.$refs.show2, "show_2", 300);
      this.shows.show_3 = this.handleScroll(this.$refs.show3, "show_3", 60);
      this.shows.show_4 = this.handleScroll(this.$refs.show4, "show_4", 60);
      this.artshows.forEach((item, index) => {
        this.artshows[index].artshow = this.handleScroll(
          this.$refs.artshow[index],
          " artshow" + index,
          200
        );
      });
    },
    newArtList(newVal) {
      if (newVal) {
        newVal.forEach((item, index) => {
          this.$set(this.artshows, index, { artshow: false });
        });
      }
    },
  },
  mounted() {
    this.$store.dispatch("newArticle");
    setTimeout(() => {
      this.getshow = true;
    }, 500);
  },
};
</script>

<style lang='less' scoped>
.home {
  padding-top: 30px;
  min-height: calc(100vh - 160px);
  .el-col {
    border-radius: 4px;
  }
  .hello {
    h2 {
      font-size: 30px;
    }
    p {
      font-size: 18px;
    }
  }
  .newArt {
    li {
      padding: 10px 5px;
      text-align: left;
      border-bottom: 1px solid #fff;
      p {
        font-size: 14px;
      }
    }
  }
  .article {
    // pc端
    .show_pc {
      .flex_l {
        display: flex;
        .content {
          padding-left: 40px;
        }
      }
      .flex_r {
        display: flex;
        flex-direction: row-reverse;
        .content {
          padding-right: 40px;
        }
      }
      li {
        &:hover {
          img {
            transform: scale(1.1);
            transition: all 0.3s;
          }
        }
        .imgbox {
          flex: 2;
        }
        .content {
          flex: 3;
          text-align: left;
          &:hover {
            color: #00a4ff;
            cursor: pointer;
            p {
              color: skyblue;
            }
          }
          h3 {
            padding-bottom: 10px;
          }
          p {
            font-size: 14px;
            color: #ccc;
            text-indent: 2em;
            &:last-child {
              padding-top: 20px;
              text-align: right;
            }
          }
        }
      }
    }
    // 移动端
    .show_phone {
      .content_p {
        padding: 20px;
        background-color: #000;
        opacity: 0.8;
        margin-top: 20px;
        h6 {
          padding: 6px 0;
          font-weight: 400;
        }
        p {
          text-align: left;
          text-indent: 2em;
        }
        .gogo {
          color: #fff;
          font-size: 18px;
        }
      }
    }
  }
}
</style>