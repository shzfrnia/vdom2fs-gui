<template>
  <el-form
    label-position="left"
    label-width="140px"
    :rules="formRules"
    :model="config"
    status-icon
    ref="form"
    @validate="onValidate"
  >
    <el-form-item label="Application name" prop="name">
      <el-input
        @update:model-value="updateField('name', $event)"
        :model-value="config.name"
      />
    </el-form-item>
    <el-form-item label="Application id" prop="appId">
      <el-input
        @update:model-value="updateField('appId', $event)"
        :model-value="config.appId"
      />
    </el-form-item>
    <el-form-item label="Url" prop="url">
      <el-input
        @update:model-value="updateField('url', $event)"
        :model-value="config.url"
      />
    </el-form-item>
    <el-form-item label="User" prop="user">
      <el-input
        @update:model-value="updateField('user', $event)"
        :model-value="config.user"
      />
    </el-form-item>
    <el-form-item label="Password md5" prop="passMd5">
      <el-input
        @update:model-value="updateField('passMd5', $event)"
        :model-value="config.passMd5"
      />
    </el-form-item>
    <el-form-item label="Add to favorite" prop="favorite">
      <el-switch
        @update:model-value="updateField('favorite', $event)"
        :model-value="config.favorite"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  emits: ["update:form-valid", "update:config"],
  props: {
    config: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    formValid: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  data() {
    return {
      formRules: {
        name: [
          {
            required: true,
            message: "Please input application name",
            trigger: ["blur"],
          },
          {
            min: 1,
            max: 10,
            message: "Length should be 3 to 5",
            trigger: "change",
          },
        ],
        appId: [
          {
            required: true,
            message: "Please input application id",
            trigger: "blur",
          },
        ],
        url: [
          {
            required: true,
            message: "Please input application url",
            trigger: "blur",
          },
          {
            required: true,
            validator: async (rule, value, callback) => {
              try {
                await this.checkApplicationUrl(value);
              } catch (e) {
                callback(new Error(e));
              }
            },
            trigger: "blur",
          },
        ],
      },
      validatedFields: {},
    };
  },
  methods: {
    ...mapActions("vdom2fs", ["checkApplicationUrl"]),
    async updateField(name, value) {
      const configCopy = { ...this.config };
      configCopy[name] = value;
      this.$emit("update:config", configCopy);
    },
    async onValidate(name, result) {
      this.validatedFields[name] = result;
    },
    async resetFields() {
      this.$refs.form.resetFields();
    },
    async checkForm() {
      this.$refs.form.validate((isValid, fields) => {
        Object.entries(fields).forEach((el) => {
          this.validatedFields[el[0]] = false;
        });
      });
      this.$refs.form.clearValidate();
    },
  },
  async mounted() {
    this.checkForm();
  },
  async updated() {
    this.checkForm();
  },
  watch: {
    validatedFields: {
      async handler(value) {
        this.$emit(
          "update:form-valid",
          Object.entries(value).every((el) => el[1])
        );
      },
      deep: true,
    },
  },
};
</script>