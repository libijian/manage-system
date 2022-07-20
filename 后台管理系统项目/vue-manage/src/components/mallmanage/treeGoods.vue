<template>
  <!-- :props="props" 渲染的数据
label	指定节点标签为节点对象的某个属性值	
children	指定子树为节点对象的某个属性值	
isLeaf	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效	

  
  :load="loadNode"   加载子树数据的方法，仅当 lazy 属性为true 时生效
  lazy
  show-checkbox
  @check-change="handleCheckChange"

  accordion 是否每次只打开一个同级数节点
  -->
  <div  >
    <el-tree :props="props" :load="loadNode" lazy accordion
    @node-click='nodeClick'
    > </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
      },
      count: 1,
    };
  },
  methods: {
nodeClick(data){
console.log(data);
//传递数据给父组件
this.$emit('sendTreeData',data)
}
    ,
    loadNode(node, resolve) {
      // node是节点 resolve成功返回数据的结果
      // console.log(node.level);
      if (node.level === 0) {
        this.$api.getselectCategory().then(response => {
        return resolve(response.data.result);
        });

      }
      if (node.level >= 1) {
                this.$api.getselectCategory({
                  id:node.data.cid
                }).then(response => {
                  if(response.data.status===200){
        return resolve(response.data.result);
                  }else{
                    return resolve([])
                  }

        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.footer{
  margin-top:40px ;
  text-align: center;
}
</style>