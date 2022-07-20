<template>
  <div class="login">
    <h3>登录界面</h3>
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="60px"
      class="demo-loginForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import jwt from "jwt-decode";
export default {
  name: "login",
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations("login", ["setUser"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("校验通过", this.loginForm);
          let { username, password } = this.loginForm;
          console.log(username, password);
          this.$api
            .getlogin({
              username,
              password,
            })
            .then((res) => {
              console.log("----------", res.data);
              if (res.data.status === 200) {
                console.log(jwt(res.data.data));
                //登录成功：1.存储登录信息 2.跳转网页 3.顶部区域显示用户信息
                let obj = {
                  user: jwt(res.data.data).username,
                  token: res.data.data,
                };
                this.setUser(obj);
                //存储到本地
                localStorage.setItem("user", JSON.stringify(obj));
                //跳转
                this.$router.push("/home");
              } else {
                //账号密码错误
              }
            });
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
.login {
  width: 400px;
  height: 400px;
  margin: 100px auto;
  border-radius: 10px;
  border: 1px solid white;
  background: #fff;
}
</style>