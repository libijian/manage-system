<template>
  <el-row :gutter="20">
    <el-col :span="14" style="margin-top: 20px">
      <el-card style="height: 330px; margin-bottom: 20px; background: #d0d0d0">
        <div class="title">
          <h1>欢迎来到后台管理系统!</h1>
        </div>
      </el-card>
      <div class="graph">
        <el-card style="width: 900px; height: 300px; margin-left: 20px">
          <div id="main" style="width: 100%; height: 300px"></div>
        </el-card>
      </div>
    </el-col>
          <el-card style="height: 100px; margin-top: 20px; background: #d0d0d0">
            <div class="title">
            <h3>商品列表</h3>
            </div>
      </el-card>
    <el-col :span="10" style="margin-top: 20px">
      <el-card style="height: 100%; margin-bottom: 20px">
        <el-table :data="tableData" style="height: 800px; overflow-x: hidden;
        overflow-y: scroll;">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "user",
  data() {
    return {
      items: [],
      tableData: [],
      tableLabel: {
        name: "名字",
        amount: "库存量",
        price:"价格"
      },
    };
  },

  mounted() {
    var myChart = this.$echarts.init(document.getElementById("main"));


    this.$api.getallgoodslist().then((response)=>{

this.tableData=response.data.data;
// console.log(this.tableData);
    })

    this.$api.getGoodsList().then((response) => {
      let arr1 = [];
      let arr = [];
      this.items = response.data.data;
      // console.log(this.items);
      this.items.map((item) => {
        arr.push(Object.assign({}, { shuliang: item.amount }));
      });
      var arr2 = arr.map((item) => {
        return item.shuliang;
      });
      this.items.map((item) => {
        arr1.push(Object.assign({}, { goods: item.name }));
      });
      var arr3 = arr1.map((item) => {
        return item.goods;
      });
      // console.log(arr2);
      // console.log(arr3);
      myChart.setOption({
        title: {
          text: "销售产品库存显示",
        },
        tooltip: {},
        legend: {},
        xAxis: {
          data: arr3,
        },
        yAxis: {},
        series: [
          {
            name: "库存量",
            type: "bar",
            data: arr2,
          },
        ],
      });
    });
    // 基于准备好的dom，初始化echarts实例


  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    font-style: italic;
    font-size: 70px;
  }
}
</style>
