<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="clearForm"
    >
      <div class="text">
        <el-form
          :model="goodsForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="类别选择">
            <el-input
              v-model="goodsForm.category"
              style="width: 15%; margin-right: 30px"
            >
            </el-input>
            <el-button type="primary" @click="innerVisible = true"
              >类目选择
            </el-button>
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
          <el-form-item label="发布时间" prop="time">
            <el-input v-model="goodsForm.time"></el-input>
          </el-form-item>

          <el-form-item label="商品图片" prop="image">
            <el-button type="primary" @click="innerVisibleImg = true"
              >上传图片</el-button
            >
          </el-form-item>
          <img
            v-show="isshowimg"
            :src="goodsForm.image"
            style="height: 300px; width: 300px; margin-left: 100px"
            alt=""
          />
          <el-form-item label="商品描述" prop="about">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              v-model="goodsForm.about"
            ></textarea>
          </el-form-item>

          <el-form-item style="text-align: center">
            <el-button
              style="margin-right: 30px"
              type="primary"
              @click="submitForm('ruleForm')"
              >确认添加</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>

          <!--弹框底部区域-->
        </el-form>
      </div>

      <!--类目选择-->
      <el-dialog
        width="40%"
        title="类目选择"
        :visible.sync="innerVisible"
        append-to-body
      >
        <TreeGoods @sendTreeData="sendTreeData" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="Showtreedata()">确 定</el-button>
        </span>
      </el-dialog>
      <!--上传图片-->
      <el-dialog
        width="40%"
        title="上传图片"
        :visible.sync="innerVisibleImg"
        append-to-body
      >
        <UpImg @sendImg="sendImg" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleImg = false">取 消</el-button>
          <el-button type="primary" @click="showimg">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import UpImg from "../mallmanage/upImg.vue";
import TreeGoods from "../mallmanage/treeGoods.vue";
export default {
  props: {
    title: {
      type: String,
      default: "添加商品",
    },
    rowDate: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  components: { TreeGoods, UpImg },
  // props:["dialogVisible"],
  data() {
    return {
      currentpage: 1,
      isshowimg: false,
      imgUrl: "",
      innerVisibleImg: false,
      innerVisible: false,
      dialogVisible: false,
      treedata: {},
      goodsForm: {
        id:"",
        cid: "",
        name: "",
        price: "",
        amount: "",
        image: "",
        about: "",
        category: "",
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
      },
    };
  },

  methods: {
    showimg() {
      (this.isshowimg = true), (this.goodsForm.image = this.imgUrl);
      this.innerVisibleImg = false;
    },
    sendImg(val) {
      this.imgUrl = val;
      console.log("是这样的", val);
    },
    Showtreedata() {
      console.log(this.treedata.name);
      this.innerVisible = false;
      this.goodsForm.category = this.treedata.name;
      this.goodsForm.cid = this.treedata.cid;
    },
    //获取Treegoods选择的数据
    sendTreeData(val) {
      console.log("传过来的数据是", val.name);
      this.treedata = val;
    },
    close() {
      this.$emit("changeDialog");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("获取输入信息", this.goodsForm);
          let { name, price, amount, image, about, category, cid ,time,id} =
            this.goodsForm;
if(this.title==="添加商品"){
          this.$api
            .addGoodslist({
              time,
              name,
              price,
              amount,
              image,
              about,
              category,
              cid,
            })
            .then((res) => {
              console.log("添加实现", res.data);
              if (res.data.status === 200) {
                this.$parent.getlist(1);
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
                this.clearForm();
              } else {
                this.$message.error("错误了");
              }
            });
        }else{
console.log("编辑商品");
this.$api.editGoodslist({
  name, price, amount, image, about, category, cid ,time,id
}).then(res=>{
  console.log("成功修改",res.data);
                if (res.data.status === 200) {
                 this.currentpage=1;
                this.$parent.getlist(1);

                this.$message({
                  message: "修改成功",
                  type: "success",
                });
                this.clearForm();
              } else {
                this.$message.error("修改操作失败");
              }
})
        }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.goodsForm = {
        cid: "",
        name: "",
        price: "",
        amount: "",
        image: "",
        about: "",
        category: "",
        time: "",
      };
    },
    clearForm() {
      //清空表单
      this.dialogVisible = false;

      this.goodsForm = {
        cid: "",
        name: "",
        price: "",
        amount: "",
        image: "",
        about: "",
        category: "",
        time: "",
      };
    },
  },
};
</script>

<style lang="less" scoped>
.text {
  background: #fff;
  padding: 10px;
  padding-right: 30px;
  border: 1px solid #eee;
}
</style>