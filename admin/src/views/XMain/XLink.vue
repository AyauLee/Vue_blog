<template>
  <div class="link">
    <el-table :data="linksInfo" style="width: 100%" height="100%">
      <el-table-column label="链接标题" width="240">
        <template slot-scope="scope">
          <i class="el-icon-star-off"></i>
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="链接地址" width="520">
        <template slot-scope="scope">
          <span>{{ scope.row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="链接分类" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.cate }}</span>
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
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="addlink">
      <el-button type="text" @click="dialogFormVisible = true"
        >添加新链接</el-button
      >

      <el-dialog
        :title="form._id ? '更新链接' : '新增链接'"
        :visible.sync="dialogFormVisible"
        :before-close="noHandle"
      >
        <el-form :model="form">
          <el-form-item label="链接标题" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="链接地址" :label-width="formLabelWidth">
            <el-input v-model="form.url" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="链接分类" :label-width="formLabelWidth">
            <el-select v-model="form.cate" placeholder="请选择分类">
              <el-option label="工具" value="工具"></el-option>
              <el-option label="学习资料" value="资料"></el-option>
              <el-option label="友情链接" value="友情链接"></el-option>
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
  name: "XLink",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        title: "",
        url: "",
        cate: "",
        _id: "",
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapState({
      linksInfo: ({ link }) => link.linksInfo,
    }),
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    // 编辑链接
    handleEdit(index, row) {
      this.form = { ...row };
      this.dialogFormVisible = true;
    },
    // 删除链接
    async handleDelete(index, row) {
      try {
        await this.$confirm("此操作将永久删除该链接, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        if (!this.isAdmin) return this.$message.error("暂无该权限！");
        let result = await this.$store.dispatch("deleteLink", row._id);
        this.$message({ message: result, type: "success" });
        this.$store.dispatch("getLinksInfo");
      } catch (error) {
        if (error == "cancel") {
          return this.$message({ type: "info", message: "已取消删除" });
        }
        this.$message.error("删除失败！");
      }
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
        if (!this.isAdmin) return this.$message.error("暂无该权限！");
        let result = await this.$store.dispatch("updateLink", this.form);
        this.noHandle();
        this.$message({ message: result, type: "success" });
        this.$store.dispatch("getLinksInfo");
      } catch (err) {
        this.$message.error("操作失败，请稍后再试！");
      }
    },
  },
  mounted() {
    // 派发actions 获取链接列表
    this.$store.dispatch("getLinksInfo");
  },
};
</script>

<style lang='less' scoped>
.link {
  position: relative;
  height: 100%;
  .addlink {
    position: absolute;
    top: 0;
    right: 20px;
  }
}
</style>