<template>
  <el-row :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="always">
        <div class="user">
          <img :src="userImg" alt="" />
          <div class="user-info">
            <p class="name">{{userinfo.user}}</p>
            <p class="admin">管理员</p>
          </div>
        </div>
        <hr />
        <div class="login-info">
          <p>上次登录时间：<span>2022-7-9</span></p>
          <p>上次登录地点：<span>广东</span></p>
        </div>
      </el-card>

      <el-card style="margin-top: 20px; height: 700px">
        <el-table :data="tableData" style="height: 700px; overflow: scroll;">
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
    <el-col :span="16" style="margin-top:20px;  float: left">
          <div class="num" >
            <el-card v-for="(item,index) in countData" :key="index" :body-style="{display:'flex',padding:0}"> 
              <i class="icon":class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                <div class="detail">
                  <p class="num">￥{{item.value}}</p>
                     <p class="txt">￥{{item.name}}</p>
                </div>
              </i>
            </el-card>
          </div>
          <div class="footer">
          <el-card style="height:330px;margin-bottom:20px">
          </el-card>
          <div class="graph">
            <el-card style="width:700px;height:300px"></el-card>
            <el-card style="width:700px;  height:300px;margin-left: 20px;"></el-card>
          </div>
          </div>
    </el-col>
  </el-row>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState('login',['userinfo'])
  },
  name: "home",
  data() {
    return {
      userImg: require("../../assets/avatar.jpg"),
      tableData: [
        {
          date: "2016-05-02",
          name: "王小龙",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
                {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      tableLabel: {
        date: "时间",
        name: "名字",
        address: "地址",
      },
      countData: [
        {
          name: "今日订单数量",
          value: 123456,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日订单数量",
          value: 123456,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日订单数量",
          value: 123456,
          icon: "success",
          color: "#2ec7c9",
        },
      ],
    };
  },
  mounted() {

  },
};
</script>
<style lang="less">
.user {
  position: relative;
  justify-content: space-around;
  display: flex;
  .user-info {
    margin-top: 25px;
    margin-right: 90px;
  }
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 1px solid #999;
  }
}
.login-info {
  text-align: center;
}

.el-table th,
.el-table td {
  padding: 35px;
}
.el-card is-always-shadow {
  width: 300px;
}
.num {
  align-items: center;
  .el-card {
    margin: 5px;
  }
  .icon {
    width: 110px;
    height: 110px;
  }
  .detail {
    text-align: center;
    position: absolute;
    left: 65%;
  }
}
.footer{
  margin-top: 20px;
}
.graph {
display: flex;
}

</style>