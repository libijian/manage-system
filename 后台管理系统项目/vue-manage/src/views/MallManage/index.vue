<template>
  <div class="main">
    <div class="manage-top">
      <el-input
        @change="searchInput"
        placeholder="请输入内容"
        v-model="input"
        clearable
        style="width: 1700px"
      >
      </el-input>
      <el-button
        type="primary"
        icon="el-icon-delete"
        @click="clear()"
        style="margin-left: 20px"
        >删除</el-button
      >
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus">
        <router-link to="/addgoods" style="color: #fff">添加</router-link>
      </el-button>
      <el-button type="primary" icon="el-icon-plus" @click="addgoods"
        >弹框添加</el-button
      >
    </div>
    <div class="wrapper">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="100"> </el-table-column>
        <el-table-column prop="id" label="商品ID" width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="amount" label="数量"> </el-table-column>
        <el-table-column prop="category" label="类别"> </el-table-column>
        <el-table-column prop="image" label="图片" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="time" label="发布时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="about" label="描述" show-overflow-tooltip>
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
    </div>
    <!-- 3.分页 -->
    <Mypagnation
      :pageSize="pageSize"
      :total="total"
      @changePage="changePage"
      :currentpage="currentpage"
    />
    <!-- 4 弹框-->
    <!-- <Goodsdialog :dialogVisible="dialogVisible" @changeDialog="changeDialog"/> -->
    <Goodsdialog ref="dialog" :title="title" :rowDate="rowDate"/>
  </div>
</template>
<script>
import Mypagnation from "../../components/mallmanage/Mypagnation.vue";
import Goodsdialog from "../../components/mallmanage/goodsdialog.vue";
export default {
  components: { Mypagnation, Goodsdialog },
  comments: {
    Mypagnation,
    Goodsdialog,
  }, 
  name: "mallManage",
  data() {
    return {
      input: "",
      tableData: [],
      total: 10,
      pageSize: 1,
      type: 1,
      dialogVisible: false,
      currentpage: 1,
      title:'添加商品',
      rowDate:{},//当前行的数据对象
    };
  },
  methods: {
    //*出现弹框

    addgoods() {
      this.$refs.dialog.dialogVisible = true;
      this.title='添加商品'
    },
    changeDialog() {
      this.dialogVisible = false;
    },

    //*------------------*搜索查询
    searchInput(val) {
      if (!val) {
        this.getlist(1);
        this.currentpage=1;
        this.type = 1;
        return;
      }
      this.$api
        .getSearchlist({
          search: val,
        })
        .then((response) => {
          this.currentpage = 1;
          console.log(response.data);
          if (response.data.status === 200) {
            //假设需要分页处理
            console.log(this.total);
            this.list = response.data.result; //获取搜索数据
            this.total = response.data.result.length;
            this.pageSize = 3;
            this.tableData = response.data.result.slice(0, 3);
            this.type = 2;
          } else {
            this.tableData = [];
            this.total = 1;
            this.pageSize = 1;
            this.type = 1;
          }
        });
    },
    changePage(num) {
      this.currentpage = num;
      if (this.type == 1) {
        this.getlist(num);
      } else {
        console.log(this.list);
        this.tableData = this.list.slice((num - 1) * 3, num * 3);
      }
    },
    clear(val) {
      this.input = "";
      if (!val) {
        this.getlist(1);
        this.type = 1;
        return;
      }
    },
    //编辑操作
    handleEdit(index, row) {
      this.$refs.dialog.dialogVisible = true;
      this.title='编辑商品';
this.$refs.dialog.goodsForm=row;
console.log(this.$refs.dialog.goodsForm);
    },



    //删除操作
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .deleteGoodslist({
              name: row.name,
            })
            .then((res) => {
                        this.currentpage = 1;
              this.getlist(1);
              console.log("删除成功", res.data);
            });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      console.log(index, row);
    },

    //商品列表的获取
    getlist(page) {
      this.$api
        .getGoodsList({
          page,
        })
        .then((response) => {
          this.tableData = response.data.data;
          this.total = response.data.total;
          this.pageSize = response.data.pageSize;
          console.log(response.data.data);
        });
    },
  },
  mounted() {
    this.getlist(1);
  },
};
</script>

<style lang="less">
.manage-top {
  display: flex;
}

.wrapper {
  margin-top: 30px;
  .cell {
    display: flex;
  }
}
</style>