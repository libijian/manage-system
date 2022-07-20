<template>
  <div class="left">
    <el-menu
      style="height: 110vh"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#fffd04b"
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <h3>{{isCollapse ?'后台':'通用后台管理系统'}}</h3>
      <el-menu-item
        @click="clickMenu(item)"
        v-for="item in noChildren"
        :index="item.path"
        :key="item.path"
      >
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu
      @click="clickMenu(item)"
        v-for="item in hasChildren"
        :index="item.path + ''"
        :key="item.path"
      >
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
       <!-- 二级子菜单 -->
        <el-menu-item-group
          v-for="(subItem, subIndex) in item.children"
          :key="subItem.path"
        >
          <el-menu-item :index="subIndex + ''">{{
            subItem.label
          }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      menu: [
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/home",
        },
        {
          path: "/mallManage",
          name: "mallManage",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },
        {
          path: "/user",
          name: "user",
          label: "个人中心",
          icon: "user",
          url: "User/User",
        },
                {
          path: "/usermanage",
          name: "usermanage",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/PageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/PageTwo",
            },
          ],
        },
      ],
    };
  },
  name: "CommonAside",
  methods: {
    clickMenu(item) {
      if(this.$route.name !==item.name){
      this.$router.push({
        name:item.name
      });
      }
    },
  },
  computed: {
    noChildren() {
      return this.menu.filter((item) =>!item.children);
    },
    hasChildren() {
      return this.menu.filter((item) =>item.children);
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    }
  },
};
</script>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border: none;
  h3 {
    height: 20px;
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>

