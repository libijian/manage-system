<template>
    <el-container  >
  <el-aside  style="width:auto">
    <CommonAside/>
    </el-aside>
  <el-container>
    <el-header>
     <CommonHeader/>
    </el-header>
    <el-main style="height:900px;">
      <router-view/></router-view>
      </el-main>
  </el-container>
</el-container>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
export default {
    name:'Main',
     components: {
    CommonAside,
    CommonHeader
  }
}

</script>
<style>
    .el-header{
        background-color: rgb(100, 95, 95);

    }
</style>