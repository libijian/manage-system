<template>
  <div class="addgoods">
    <div class="title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mallManage' }"
          >商品管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="text">
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类别选择">
          <el-button type="primary">类目选择</el-button>
        </el-form-item>

        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goodsForm.name"></el-input>
        </el-form-item>

        <el-form-item label="商品价格" prop="price">
          <el-input v-model="goodsForm.price"></el-input>
        </el-form-item>

        <el-form-item label="商品数量" prop="amount">
          <el-input v-model="goodsForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" required>
          <el-col :span="5">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="goodsForm.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">-</el-col>
          <el-col :span="5">
            <el-form-item prop="date2">
              <el-time-picker
                placeholder="选择时间"
                v-model="goodsForm.date2"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="商品图片" prop="pic">
          <el-button type="primary">上传图片</el-button>
        </el-form-item>

        <el-form-item label="商品描述" prop="about">
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsForm: {
        name: "",
        price: "",
        amount: "",
        pic: "",
        about: "",
        type: "",
        time: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        amount: [{ required: true, message: "请输入数量", trigger: "blur" }],
        time: [{ required: true, message: "请输入发布时间", trigger: "blur" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.addgoods {
  margin: 10px;
  .title {
    padding: 10px;
    background: #fff;
    border: 1px solid #eee;
    margin-bottom: 10px;
  }
  .text {
    background: #fff;
    padding: 10px;
    padding-right: 30px;
    border: 1px solid #eee;
  }
}
</style>