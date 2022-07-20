<template>
  <div class="content">
    <div class="l-content">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        style="margin: 10px; height: 30px;"
        @click="handleMenu"
      >
      </el-button>
    </div>
    <div class="r-content">
      <el-dropdown style="margin-top: 0px">
        <span class="el-dropdown-link">
          <img class="user" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="list-style: none;"><router-link to="/user">个人中心</router-link></el-dropdown-item>
          <el-dropdown-item ><i @click="loginout" style="width:100%;height:100%">退出登录</i></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/avatar.jpg"),
    };
  },
computed:{
...mapState('login',['userinfo'])
},
  methods:{
    ...mapMutations('login',['clearUser']),
    loginout(){
this.clearUser()
localStorage.removeItem('user')
this.$router.push('/login')
    },
    handleMenu(){
      this.$store.commit('collapseMenu');
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  justify-content: space-between;
  display: flex;
  align-content: center;

  .l-content {
    align-items: center;
    align-content: center;
    display: flex;
  }
  .r-content {
    position: relative;
    top: 15px;

    .el-icon-arrow-down {
      font-size: 12px;
    }
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }

  }
}
</style>
