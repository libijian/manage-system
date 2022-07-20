<template>
  <!--
    ref="upload" 获取dom元素 --uplogad
    action=""  必选的参数，上传的地址string
    :on-preview	点击文件列表中已上传的文件时的钩子	function(file)	
    :on-remove	文件列表移除文件时的钩子	function(file, fileList)
    auto-upload	是否在选取文件后立即进行上传	boolean	—	true
    file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]	array

    --->
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="url"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success='successUpload'
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
import base from '../../api/base'
export default {
  data() {
    return {
        url:base.uploadUrl,
      fileList: [],
    };
  },
  methods: {
    //上传成功函数
successUpload(response,file,fileList){
console.log('上传成功',response,file,fileList);
        this.$message({
          message: '已成功上传',
          type: 'success'
        });
        let imgUrl=base.host+'/'+response.url.slice(7);
        this.$emit('sendImg', imgUrl);
}
    ,
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>

<style lang="less" scoped>
</style>