<template>
  <div class="artcate">
    <el-table
      :data="artCateInfo"
      style="width: 100%; padding: 30px; font-size: 16px"
      height="100%"
      :header-cell-style="{ 'padding-left': '30px' }"
    >
      <el-table-column label="分类名" width="200">
        <template slot-scope="scope">
          <i class="el-icon-collection-tag" style="color: #00a4ff"></i>
          <span style="margin-left: 10px">{{ scope.row.catename }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类按钮" width="200">
        <template slot-scope="scope">
          <el-tag :type="scope.row.ctype" effect="dark" style="font-size: 16px">
            {{ scope.row.ctype || "default" }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="文章数" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            :disabled="scope.row.count != 0"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="addcate">
      <el-button type="text" @click="dialogFormVisible = true"
        >添加分类</el-button
      >

      <el-dialog
        :title="form._id ? '更新分类' : '新增分类'"
        :visible.sync="dialogFormVisible"
        :before-close="noHandle"
      >
        <el-form :model="form">
          <el-form-item label="分类名" :label-width="formLabelWidth">
            <el-input v-model="form.catename" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="分类按钮" :label-width="formLabelWidth">
            <el-select v-model="form.ctype" placeholder="请选择分类">
              <el-option label="default" value=""></el-option>
              <el-option label="success" value="success"></el-option>
              <el-option label="info" value="info"></el-option>
              <el-option label="warning" value="warning"></el-option>
              <el-option label="danger" value="danger"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="noHandle">取 消</el-button>
          <el-button type="primary" @click="hasHandle">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ArtCate",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        catename: "",
        ctype: "",
        _id: "",
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapState({
      artCateInfo: (state) => state.artcate.artCateInfo,
    }),
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    // 编辑按钮的回调
    handleEdit(index, row) {
      this.form = { ...row };
      this.dialogFormVisible = true;
    },
    // 删除分类
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          try {
            if (!this.isAdmin) return this.$message.error("暂无该权限！");
            let result = await this.$store.dispatch("deleteArtCate", row._id);
            this.$message({
              message: result,
              type: "success",
            });
            this.$store.dispatch("getArtCateInfo");
          } catch (error) {
            this.$message.error("删除失败！");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 取消的回调
    noHandle() {
      this.dialogFormVisible = false;
      for (const k in this.form) {
        this.form[k] = "";
      }
    },
    // 确定的回调
    async hasHandle() {
      try {
        let result = await this.$store.dispatch("updateArtCate", this.form);
        this.noHandle();
        this.$message({
          message: result,
          type: "success",
        });
        this.$store.dispatch("getArtCateInfo");
      } catch (err) {
        this.$message.error(err);
      }
    },
  },
  mounted() {
    // 派发actions 获取链接列表
    this.$store.dispatch("getArtCateInfo");
  },
};
</script>

<style lang='less' scoped>
.artcate {
  position: relative;
  height: 100%;
  .addcate {
    position: absolute;
    top: 30px;
    right: 40px;
  }
  /deep/.el-table__row {
    td {
      &:first-child {
        padding-left: 20px;
      }
      &:nth-child(2) {
        padding-left: 30px;
      }
      &:nth-child(3) {
        padding-left: 50px;
      }
    }
  }
}
</style>