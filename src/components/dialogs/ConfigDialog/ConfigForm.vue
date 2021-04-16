<template>
  <el-form
    label-position="left"
    label-width="140px"
    :model="form"
    :rules="formRules"
    ref="form"
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

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
  beforeUpdate() {
    this.fillForm();
  },
  mounted() {
    this.fillForm();
  },
  data() {
    return {
      form: {},
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
    async resetFields() {
      this.$refs.form.resetFields();
    },
    fillForm() {
      this.resetFields();
      this.form = {...this.config};
    },
    getFormState() {
      return this.form;
    }
  },
};
</script>