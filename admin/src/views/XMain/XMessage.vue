<template>
  <div class="message">
    <el-table :data="messageList" style="width: 100%; padding: 20px 30px">
      <el-table-column type="expand" style="width: 100%">
        <template slot-scope="props">
          <div class="msg_body">
            <h4>留言内容</h4>
            <p>{{ props.row.message }}</p>
            <div v-show="props.row.reply">
              <h4>回复内容</h4>
              <p>{{ props.row.reply }}</p>
              <h4>回复时间：</h4>
              <p>{{ props.row.replydate }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="昵称" prop="name" width="120px">
      </el-table-column>
      <el-table-column label="留言时间" prop="date"> </el-table-column>
      <el-table-column label="邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span :class="{ noreply: scope.row.status == '待回复' }">{{
            scope.row.status
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :disabled="scope.row.status == '已回复'"
            @click="handleEdit(scope.$index, scope.row)"
            >回复</el-button
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

    <el-dialog
      title="回复留言"
      :visible.sync="dialogShow"
      :before-close="noHandle"
      width="460px"
      center
    >
      <div class="reply">
        <p>{{ form.name }}：</p>
        <p>{{ form.message }}</p>
        <p>—— {{ form.date }}</p>
        <div>
          <p>回复ta：</p>
          <textarea
            v-model.trim="form.reply"
            class="reply_body"
            cols="50"
            rows="5"
          ></textarea>
        </div>
      </div>
      <div slot="footer" class="dialog-footer handle">
        <el-button type="primary" @click="hasHandle">确 定</el-button>
        <el-button @click="noHandle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "XMessage",
  data() {
    return {
      messageList: [],
      dialogShow: false, // 控制对话框显示
      form: {
        name: "",
        email: "",
        message: "",
        _id: "",
        date: "",
        reply: "",
      },
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    // 获取评论列表
    getData() {
      this.$API.getMessageList().then((data) => {
        this.messageList = data;
      });
    },
    // 点击回复的处理函数
    handleEdit(index, row) {
      for (let k in this.form) {
        this.form[k] = row[k];
      }
      this.dialogShow = true;
    },
    // 点击删除的处理函数
    async handleDelete(index, row) {
      try {
        await this.$confirm("此操作将永久删除该留言, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        if (!this.isAdmin) return this.$message.error("暂无该权限");
        let result = await this.$API.deleteMessage(row._id);
        if (result.status == 0) {
          this.$message({ type: "success", message: result.message });
          this.getData();
        } else {
          this.$message.error(result.message);
        }
      } catch (error) {
        if (error == "cancel") {
          return this.$message({ type: "info", message: "已取消删除" });
        }
        this.$message.error("删除失败！");
      }
    },
    // 取消的回调
    noHandle() {
      this.dialogShow = false;
      for (const k in this.form) {
        this.form[k] = "";
      }
    },
    // 确定的回调
    async hasHandle() {
      if (!this.form.reply) {
        return this.$message.error("回复内容不能为空！");
      }
      try {
        let result = await this.$API.reqReplyInfo(this.form);
        if (result.status == 0) {
          this.$message({ type: "success", message: result.message });
          this.noHandle();
          this.getData();
        } else {
          this.$message.error(result.message);
        }
      } catch (error) {
        this.$message.error("操作失败！");
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style lang="less" scoped>
.message {
  height: 100%;
  .msg_body {
    padding: 10px 40px;
  }
  .reply {
    p {
      &:nth-child(2) {
        text-indent: 2em;
      }
      &:nth-child(3) {
        text-align: right;
        font-size: 10px;
        color: #999;
      }
    }
    .reply_body {
      padding: 10px;
      margin-left: 30px;
      outline: none;
      resize: none;
    }
  }
  .handle {
    display: flex;
    flex-direction: row-reverse;
    .el-button {
      padding: 10px 15px;
      margin-left: 15px;
      font-size: 12px;
    }
  }
  .noreply {
    color: orangered;
  }
}
</style>