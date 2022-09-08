<template>
  <my-dialog
    :dialogTitle="dialogTitle"
    @update:modelValue="onDialogShowUpdate"
    :model-value="show"
    @confirm-click="onConfirmClick"
    :confirm-btn-disabled="!formIsValid"
  >
    <template #dialog-content>
      <config-form
        ref="form"
        v-model:form-valid="formIsValid"
        :config="config"
        @update:config="onConfigUpdate"
      />
    </template>
  </my-dialog>
</template>

<script>
import MyDialog from "@/components/dialogs/Dialog";
import ConfigForm from "./ConfigForm";
import { mapActions } from "vuex";

export default {
  emits: ["update:show", "update:config"],
  components: { MyDialog, ConfigForm },
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true,
    },
    config: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
  },
  data() {
    return {
      formIsValid: false,
      changedConfig: { ...this.config },
    };
  },
  methods: {
    ...mapActions("configs", ["updateConfig"]),
    async onConfirmClick() {
      this.updateConfig(this.changedConfig);
      this.onDialogShowUpdate(false);
    },
    async onDialogShowUpdate(value) {
      this.$emit("update:show", value);
    },
    async onConfigUpdate(newValue) {
      this.changedConfig = newValue;
      this.$emit("update:config", newValue);
    },
    async checkForm() {
      this.$refs.form.checkForm();
    },
  },
  watch: {
    async show(value) {
      if (value) {
        setTimeout(() => {
          this.$refs.form.checkForm(this.config.id < 0);
        }, 1);
      }
    },
  },
  computed: {
    dialogTitle() {
      return `${this.config.id === -1 ? "Create" : "Edit"} application config`;
    },
  },
};
</script>