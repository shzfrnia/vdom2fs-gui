<template>
  <default>
    <div class="wrapper">
      <uploader accept=".txt" tip="Upload application config file or input" />
      <el-button
        @click="dialogVisible = true"
        size="medium"
        icon="el-icon-plus"
        circle
      />
    </div>
    <my-dialog dialogTitle="Create application config" v-model="dialogVisible">
      <template #dialog-content>
        <el-form
          label-position="left"
          label-width="140px"
          :model="form"
          :rules="formRules"
          ref="configForm"
        >
          <el-form-item label="Application name" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Application id" prop="appId">
            <el-input v-model="form.appId"></el-input>
          </el-form-item>
          <el-form-item label="Url" prop="url">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item label="User" prop="user">
            <el-input v-model="form.user"></el-input>
          </el-form-item>
          <el-form-item label="Password md5" prop="passMd5">
            <el-input v-model="form.passMd5"></el-input>
          </el-form-item>
          <el-form-item label="Add to favorite" prop="favorite">
            <el-switch v-model="form.favorite"></el-switch>
          </el-form-item>
        </el-form>
      </template>
    </my-dialog>
  </default>
</template>
<script>
import Default from "@/layouts/Default";
import Uploader from "@/components/inputs/Uploader";
import MyDialog from "@/components/dialogs/Dialog";

export default {
  components: {
    Default,
    Uploader,
    MyDialog,
  },
  name: "Home",
  data() {
    return {
      dialogVisible: true,
      form: {
        appId: "",
        name: "",
        url: "",
        user: "",
        passMd5: "",
        favorite: false,
      },
      formRules: {
        name: [
          {
            required: true,
            message: "Please input application name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        appId: [
          {
            required: true,
            message: "Please input application id",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async addConfig() {
      this.closeDialog();
    },
    async foo(done) {
      done();
    },
  },
  watch: {
    dialogVisible(value) {
      if (!value) this.$refs["configForm"].resetFields();
    },
  },
};
</script>

<style scoped>
.wrapper {
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.uploader {
  margin-bottom: 10px;
}
</style>
