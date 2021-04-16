<template>
  <my-dialog
    dialogTitle="Create application config"
    @update:modelValue="onDialogShowUpdate"
    :model-value="show"
    @confirm-click="onConfirmClick"
  >
    <template #dialog-content>
      <config-form ref="form" :config="config" />
    </template>
  </my-dialog>
</template>

<script>
import MyDialog from "@/components/dialogs/Dialog";
import ConfigForm from "./ConfigForm";
import { mapMutations } from "vuex";

//TODO form falid flag for form.
export default {
  emits: ["update:show"],
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
    createMode: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    ...mapMutations("configs", ["updateConfig", "addConfig"]),
    async onConfirmClick() {
      const formDataCopy = { ...this.$refs.form.getFormState() };
      if (!this.createMode) {
        this.updateConfig({ oldConfig: this.config, newConfig: formDataCopy });
      } else {
        this.addConfig(formDataCopy);
      }
      this.onDialogShowUpdate(false);
    },
    async onDialogShowUpdate(value) {
      if (!value) {
        setTimeout(this.$refs.form.resetFields, 50);
      }
      this.$emit("update:show", value);
    },
  },
};
</script>