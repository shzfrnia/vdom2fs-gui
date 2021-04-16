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

export default {
  emits: ["created", "update:show"],
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
  methods: {
    async onConfirmClick() {
      this.onDialogShowUpdate(false);
    },
    async onDialogShowUpdate(value) {
      if (!value) {
        this.$refs.form.resetFields();
      }
      this.$emit("update:show", value);
    },
  },
};
</script>