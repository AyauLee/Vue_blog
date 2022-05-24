<template>
  <div class="pagination">
    <button
      :disabled="pageNo == 1"
      @click="$emit('goPageNo', pageNo - 1)"
      v-nochange
    >
      上一页
    </button>
    <button v-if="pageNum.start > 1" @click="$emit('goPageNo', 1)">1</button>
    <button disabled v-if="pageNum.start > 2" v-nochange>...</button>
    <button
      v-for="(num, index) in pageNum.arr"
      :key="index"
      :class="{ cur_page_btn: num == pageNo }"
      @click="$emit('goPageNo', num)"
    >
      {{ num }}
    </button>
    <button disabled v-if="pageNum.end < totalPages - 1" v-nochange>...</button>
    <button
      v-if="pageNum.end < totalPages"
      @click="$emit('goPageNo', totalPages)"
    >
      {{ totalPages }}
    </button>
    <button
      :disabled="pageNo == totalPages"
      @click="$emit('goPageNo', pageNo + 1)"
      v-nochange
    >
      下一页
    </button>
    <button style="margin-left: 30px" disabled v-nochange>
      共{{ total }}条
    </button>
  </div>
</template>

<script>
export default {
  name: "PagiNation",
  //  total:总条数  pageNo:当前页  totalPage:总页数
  props: ["total", "pageNo", "totalPages"],
  data() {
    return {
      midTab: 5, // 定义分页器中部有几页
    };
  },
  computed: {
    pageNum() {
      const { pageNo, totalPages, midTab } = this;
      let start = 0;
      let end = 0;
      if (totalPages < midTab) {
        start = 1;
        end = totalPages;
      } else {
        start = pageNo - Math.floor(midTab / 2);
        end = pageNo + Math.floor(midTab / 2);
        if (start < 1) {
          start = 1;
          end = midTab;
        } else if (end > totalPages) {
          end = totalPages;
          start = totalPages - midTab + 1;
        }
      }
      let arr = [];
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
      return { start, end, arr };
    },
  },
  directives: {
    nochange(element) {
      if (element.disabled) {
        element.className = "nochange";
      } else {
        element.className = "";
      }
    },
  },
};
</script>

<style lang='less' scoped>
.pagination {
  display: flex;
  justify-content: center;
  button {
    padding: 3px 10px;
    margin: 0 5px;
    border: 0;
    background: transparent;
    &:hover {
      color: orangered;
    }
    &.cur_page_btn {
      color: orangered;
      border-bottom: 2px solid orangered;
    }
  }
  .nochange {
    &:hover {
      color: #1010104d;
      cursor: not-allowed;
    }
  }
}
</style>